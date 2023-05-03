import { Box } from "@mantine/core";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <Box
      component="header"
      sx={{
        alignItems: "center",
        backgroundColor: "lightblue",
        display: "flex",
        height: "56px",
        justifyContent: "center",
      }}
    >
      <div>ChatGPT</div>
    </Box>
  );
};
