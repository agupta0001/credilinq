import { Box, FormHelperText, TextField } from "@mui/material";
import React from "react";
import MuiPhoneNumber from "material-ui-phone-number-2";

const ApplicantInformation = ({
  formik,
  activeStep,
}: {
  formik: any;
  activeStep: number;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginLeft: 1,
          width: "100%",
          mb: 3,
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
            label="Full Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={activeStep < 1}
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
            label="Position within company"
            id="position"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
            disabled={activeStep < 1}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginLeft: 1,
          width: "100%",
          mb: 3,
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
            label="Email Address"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="off"
            inputProps={{
              maxLength: 255,
            }}
            disabled={activeStep < 1}
          />
          <FormHelperText
            sx={{
              marginLeft: 0,
              color: "rgb(96, 26, 121)",
            }}
          >
            The report will be delivered on this email address
          </FormHelperText>
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
            label="Re-enter Email Address"
            id="confirmEmail"
            name="confirmEmail"
            value={formik.values.confirmEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)
            }
            helperText={
              formik.touched.confirmEmail && formik.errors.confirmEmail
            }
            autoComplete="off"
            inputProps={{
              maxLength: 255,
            }}
            disabled={activeStep < 1}
          />
        </Box>
      </Box>
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
          <MuiPhoneNumber
            label="Mobile Number"
            id="phoneNumber"
            name="phoneNumber"
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            value={formik.values.phoneNumber}
            onChange={(value) => {
              formik.setFieldValue("phoneNumber", value);
            }}
            onBlur={formik.handleBlur}
            disabled={activeStep < 1}
            defaultCountry="sg"
            onlyCountries={["sg"]}
            countryCodeEditable={true}
            variant="outlined"
            fullWidth={true}
            autoFormat={false}
          />
        </Box>
      </Box>
    </>
  );
};

export default ApplicantInformation;
