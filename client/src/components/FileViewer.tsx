import { processStatement, uploadFile } from "@/services";
import { FileType } from "@/types";
import { CancelRounded, RotateRightRounded } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export function FileViewer({
  formik,
  file,
  handleRemove,
  index,
}: {
  formik: any;
  file: any;
  index: number;
  handleRemove: ({
    index,
    recordId,
  }: {
    index: number;
    recordId?: number;
  }) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [savedFile, setSavedFiles] = useState<FileType | null>(null);

  useEffect(() => {
    async function upload() {
      try {
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
            setSavedFiles(uploadedFile);
          } else {
            setError(true);
          }
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }

    upload();
  }, []);

  useEffect(() => {
    if (!savedFile) return;

    let existingFiles = formik.values.uploadedFiles;
    existingFiles = existingFiles.filter(
      (file: FileType) => file.resourceId !== savedFile?.resourceId
    );
    formik.setFieldValue("uploadedFiles", [...existingFiles, savedFile]);
  }, [savedFile]);

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
        <CancelRounded
          onClick={() =>
            handleRemove({ index, recordId: savedFile?.resourceId })
          }
        />
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
