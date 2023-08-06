import { processStatement, uploadFile } from "@/services";
import { CancelRounded, RotateRightRounded } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function FileViewer({ formik, file }: { formik: any; file: any }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function upload() {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("uen", formik.values.uen);
      const uploadedFile = await uploadFile(formData);

      if (uploadedFile) {
        const isProcessed = await processStatement({
          uen: formik.values.uen,
          companyName: formik.values.companyName,
          perfiosTransactionId:
            localStorage.getItem("perfiosTransactionId") || "",
          files: [uploadedFile],
        });

        if (isProcessed.valid) {
          formik.setFieldValue("uploadedFiles", [
            ...formik.values.uploadedFiles,
            uploadedFile,
          ]);
        }
      }
      setLoading(false);
    }

    upload();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          borderRadius: "999px",
          color: error ? "rgb(255, 23, 68)" : "#000",
          border: `1px solid ${error ? "rgb(255, 23, 68)" : "#000"}`,
          padding: 1,
          width: {
            xs: "100%",
            md: "500px",
          },
        }}
      >
        {loading ? <CircularProgress /> : <RotateRightRounded />}
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "16rem",
          }}
        >
          {file.name}
        </Typography>
        <CancelRounded />
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontSize: {
            xs: 10,
            md: 14,
          },
          color: error ? "rgb(255, 23, 68)" : "#000",
        }}
      >
        {loading
          ? "Please wait while your statements are being uploaded."
          : error
          ? "We could not find an active transaction corresponding to this transaction Id"
          : ""}
      </Typography>
    </Box>
  );
}
