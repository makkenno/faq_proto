import axios from "axios";
import { type ChangeEvent, type FormEvent,useState } from "react";


export const AskForm = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAsk = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question) {
      return;
    }

    try {
      const response = await axios.post<{ answer: string }>("/api/ask", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  return (
    <form onSubmit={handleAsk}>
      <input
        type="text"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Ask a question"
      />
      <button type="submit">Ask</button>
      {answer && <div>{answer}</div>}
    </form>
  );
};
