import axios from "axios";
import { type ChangeEvent, type FormEvent,useState } from "react";

export const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post<{ message: string }>("/api/uploadfile", formData);
      // eslint-disable-next-line no-console
      console.log(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleFileUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
