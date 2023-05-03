import {
  Box,
  Button,
  Flex,
  Group,
  ScrollArea,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import { type ChangeEvent, type FormEvent, useState } from "react";

export const AskForm = () => {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<
    { message: string; sendUser: "gpt" | "user" }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAsk = async (e: FormEvent<HTMLFormElement>) => {
    setAnswers((answers) => {
      return [...answers, { message: question, sendUser: "user" }];
    });
    setQuestion("");
    e.preventDefault();
    if (!question) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post<{ answer: string }>("/api/ask", {
        question,
      });
      setAnswers((answers) => {
        return [...answers, { message: response.data.answer, sendUser: "gpt" }];
      });
    } catch (error) {
      console.error("Error asking question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAsk}>
      <ScrollArea h={500}>
        <Stack>
          {answers.length !== 0 &&
            answers.map((answer) => {
              return (
                <Flex
                  key={answer.message}
                  justify={
                    answer.sendUser === "gpt" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    sx={{
                      backgroundColor:
                        answer.sendUser === "gpt" ? "lightblue" : "lightgray",
                      borderRadius: "4px",
                      fontSize: "14px",
                      maxWidth: "80%",
                      padding: "8px",
                    }}
                  >
                    {answer.message}
                  </Box>
                </Flex>
              );
            })}
        </Stack>
      </ScrollArea>
      <Space h={20} />
      <Group spacing={16}>
        <TextInput
          sx={{ flex: 7 }}
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="質問してね"
        />
        <Button type="submit" sx={{ flex: 1 }} loading={isLoading}>
          送信
        </Button>
      </Group>
    </form>
  );
};
