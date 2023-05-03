from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
from langchain.chains import VectorDBQA, RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import TextLoader, PyPDFLoader
from langchain import PromptTemplate
from pydantic import BaseModel


import openai
import pandas as pd
import os
from typing import List, Tuple, Any

load_dotenv()

# OpenAI APIキーの設定
openai.api_key = os.environ.get("OPENAI_API_KEY")

# グローバル変数としてChromaインスタンスとRetrievalQAインスタンスを定義
vectordb: Any = None
qa: Any = None
template = """
        あなたは親切なアシスタントです。下記の質問に日本語で回答してください。
        質問：{question}
        回答：
        """
prompt = PromptTemplate(
input_variables=["question"],
template=template,
)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

loader = PyPDFLoader('./pdf/pochama.pdf')
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)
embeddings = OpenAIEmbeddings()
vectordb = Chroma.from_documents(texts, embeddings)
qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(model_name="gpt-3.5-turbo"), chain_type="stuff", retriever=vectordb.as_retriever())


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/ask/")
async def ask_question(question: Question):
    global qa, prompt  # グローバル変数を参照するための宣言

    if qa is None:
        return {"error": "No file has been uploaded yet"}

    # ここで質問に対して関連するFAQをデータベースから検索し、回答を生成する処理を行う
    query = prompt.format(question=question.dict())
    answer = qa.run(query)

    return {"answer": answer}
