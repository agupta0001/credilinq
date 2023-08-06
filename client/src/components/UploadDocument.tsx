import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Dropzone, { useDropzone } from "react-dropzone";
import { CancelRounded, RotateRightRounded } from "@mui/icons-material";
import { FileViewer } from "./FileViewer";

const uploadPoints = [
  <span key="1">
    PDFs (not scanned copies) of company&apos;s operating bank current
    account(s) statements for the past 6 months.
    <br />
    Example: If today is 23 Jul 23, then please upload bank statements from Jan
    23 to Jun 23 (both months inclusive)
  </span>,
  `If your company is multi-banked, then please upload 6 months bank statements for each bank account`,
  `If your file is password protected, we request you to remove the password and upload the file to avoid submission failure`,
  <li key="4">
    In case if you are facing any issue while uploading bank statements, Please
    contact us on{" "}
    <Link href="mailto:support@credilinq.ai">support@credilinq.ai</Link>
  </li>,
];

const UploadDocument = ({
  formik,
  activeStep,
}: {
  formik: any;
  activeStep: number;
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: activeStep < 2,
    accept: {
      "application/pdf": [],
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginLeft: 1,
          width: "100%",
          gap: {
            xs: 1,
            md: 2,
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box sx={{ flex: "1 1 0%" }}>
          <Box
            sx={{
              padding: "40px 24px",
              borderRadius: 0.5,
              border: "1px dashed rgba(0, 0, 0, 0.118)",
              backgroundColor: "rgb(250, 250, 250)",
              color: "rgb(189, 189, 189)",
            }}
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps({ accept: "application/pdf" })} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "rgb(189, 189, 189)",
              }}
            >
              <Box
                sx={{
                  padding: "8px 8px 4px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(0, 0, 84, 0.12)",
                }}
              >
                <UploadFileIcon />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "inline",
                    borderBottom: "1px solid rgb(189, 189, 189)",
                  }}
                >
                  Click to upload
                </Box>{" "}
                or drag and drop Bank Statements
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          component="ul"
          sx={{
            paddingLeft: {
              xs: 0,
              sm: 3,
            },
            listStyleType: "none",
            flex: "1 1 0%",
          }}
        >
          {uploadPoints.map((point, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <CheckIcon />
              {point}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ ml: 1, mt: 2 }}>
        {acceptedFiles?.map((file, idx) => (
          <FileViewer file={file} key={idx} formik={formik} />
        ))}
        {acceptedFiles?.length > 0 && (
          <Button sx={{ mt: 2 }}>Remove All</Button>
        )}
      </Box>
    </>
  );
};

export default UploadDocument;
