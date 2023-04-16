import type { CustomNextPage } from "next";
import { AskForm } from "src/components/AskForm";
import { UploadForm } from "src/components/UploadFile";
import { AppLayout } from "src/layout";

const Index: CustomNextPage = () => {
  return (
    <div>
      <h1>FAQ Application</h1>
      <UploadForm />
      <AskForm />
    </div>
  );
};

Index.getLayout = AppLayout;

export default Index;
