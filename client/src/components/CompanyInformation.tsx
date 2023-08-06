import { Box, TextField } from "@mui/material";
import React from "react";

const CompanyInformation = ({
  formik,
  activeStep,
}: {
  formik: any;
  activeStep: number;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: 1,
        width: "100%",
        gap: {
          xs: 3,
          md: 7,
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sx: "50%",
          },
        }}
      >
        <TextField
          label="Company UEN"
          placeholder="Enter your company UEN"
          id="uen"
          name="uen"
          value={formik.values.uen}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.uen && Boolean(formik.errors.uen)}
          helperText={formik.touched.uen && formik.errors.uen}
        />
      </Box>
      <Box
        sx={{
          width: {
            xs: "100%",
            sx: "50%",
          },
        }}
      >
        <TextField
          label="Company Name"
          placeholder="Enter your company name"
          id="companyName"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
      </Box>
    </Box>
  );
};

export default CompanyInformation;
