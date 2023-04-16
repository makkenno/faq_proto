import type { AxiosError } from "axios";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const response = await axios.post("http://127.0.0.1:8000/ask/", req.body);
    res.status(200).json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res
      .status(500)
      .json({ error: axiosError?.message, message: "Error asking question" });
  }
}
