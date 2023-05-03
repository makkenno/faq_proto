import { Box, Flex, Space } from "@mantine/core";
import type { CustomNextPage } from "next";
import { AskForm } from "src/components/AskForm";
import { AppLayout } from "src/layout";

const Index: CustomNextPage = () => {
  return (
    <>
      <Space h={40} />
      <Flex justify="center">
        <Box sx={{ maxWidth: 800, width: "100%" }}>
          <AskForm />
        </Box>
      </Flex>
    </>
  );
};

Index.getLayout = AppLayout;

export default Index;
