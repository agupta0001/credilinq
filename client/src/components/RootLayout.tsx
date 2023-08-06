"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ background: `url(/header-bg.jpg)`, backgroundSize: "cover" }}>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: { sm: "192px" },
          marginRight: { sm: "192px" },
          gap: 3,
        }}
      >
        <Image src="/logo.svg" alt="Logo" width={134} height={78} />
        <Typography
          sx={{ margin: 0, color: "white", fontSize: { xs: 14, sm: 28 } }}
        >
          SME HealthCheck - Get Started
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "rgb(245, 248, 250);" }}>{children}</Box>
      <Box
        sx={{
          background:
            "linear-gradient(266.33deg, rgb(213, 3, 125) 3.04%, rgb(118, 3, 113) 16.97%, rgb(25, 5, 83) 45.49%)",
          height: "35px",
        }}
      />
    </Box>
  );
}
