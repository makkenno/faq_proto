from fastapi import FastAPI, File, UploadFile
from pdfminer.high_level import extract_text
import pandas as pd
import openai
import langchain

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    # PDFとCSVファイルの処理
    content = ""
    if file.filename.endswith(".pdf"):
        content = extract_text(file.file)
    elif file.filename.endswith(".csv"):
        df = pd.read_csv(file.file)
        content = df.to_string()

    # ここでcontentを用いてFAQの抽出と回答の生成を行う

    return {"filename": file.filename}


@app.post("/ask/")
async def ask_question(question: str):
    # ここで質問に対して関連するFAQをデータベースから検索し、回答を生成する処理を行う

    return {"answer": "回答のサンプル"}
