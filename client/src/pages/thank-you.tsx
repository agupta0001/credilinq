import RootLayout from "@/components/RootLayout";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement } from "react";

function ThankYou() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Typography variant="h4">
        Your Details have been saved. Thank You Registering
      </Typography>
    </Box>
  );
}

ThankYou.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ThankYou;
