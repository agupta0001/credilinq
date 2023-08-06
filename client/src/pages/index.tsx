"use client";

import RootLayout from "@/components/RootLayout";
import { ReactElement, useEffect, useState } from "react";

import CompanyInformation from "@/components/CompanyInformation";
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import ApplicantInformation from "@/components/ApplicantInformation";
import UploadDocument from "@/components/UploadDocument";
import TermAndCondition from "@/components/TermAndCondition";
import * as yup from "yup";
import { useFormik } from "formik";
import { getTransactionId, searchEntity, submitForm } from "@/services";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  uen: yup
    .string()
    .required("Company UEN is required")
    .min(9, "Invalid Company UEN")
    .max(10, "Invalid Company UEN")
    .matches(
      /^((S|T)([\d]{2})([a-z]|[A-Z]{2})([\d]{4})([a-z]|[A-Z])(\.)|(\d{8})([a-z]|[A-Z])|(\d{9})([a-z]|[A-Z]))(\.)*$/g,
      "Invalid Company UEN"
    )
    .uppercase(),
  companyName: yup.string().min(3).required("Company Name is required"),
  name: yup
    .string()
    .required("Full Name is required")
    .min(2, "Minimum 2 characters required"),
  position: yup
    .string()
    .required("Position is required")
    .min(2, "Minimum 2 characters required"),
  email: yup
    .string()
    .lowercase()
    .email("Enter a valid email")
    .max(255, "Email too long")
    .required("Email is required"),
  confirmEmail: yup
    .string()
    .lowercase()
    .email("Enter a valid email")
    .max(255, "Email too long")
    .oneOf([yup.ref("email")], "Email does not match")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .min(11, "Enter a 8-digit Mobile Number")
    .max(11, "Enter a 8-digit Mobile Number")
    .required("Mobile Number is required"),
  uploadedFiles: yup.array(),
  tac: yup
    .object()
    .shape({
      checkbox: yup.boolean().required(),
    })
    .required("* Please read and select the above terms and conditions"),
});

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const formData = {
      business: {
        uen: values.uen,
        name: values.companyName,
      },
      files: values.uploadedFiles,
      perfiosTransactionId: localStorage.getItem("perfiosTransactionId") || "",
      user: {
        email: values.email,
        fullName: values.name,
        phoneNumber: values.phoneNumber,
        position: values.position,
      },
    };

    const res = await submitForm(formData);

    if (res.success) {
      router.push("/thank-you");
    }
  };

  const formik = useFormik({
    initialValues: {
      uen: "",
      companyName: "",
      name: "",
      position: "",
      phoneNumber: "",
      email: "",
      confirmEmail: "",
      uploadedFiles: [],
      tac: {
        checkbox: false,
      },
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    async function getEntities() {
      const isInvalid = Boolean(formik.errors.uen) && formik.touched.uen;
      if (!isInvalid && formik.values.uen) {
        const entities = await searchEntity(formik.values.uen.toUpperCase());

        if (entities.name) formik.setFieldValue("companyName", entities.name);
      }
    }

    getEntities();
  }, [formik.values.uen]);

  useEffect(() => {
    async function fetchTransactionId() {
      const isInvalid =
        (Boolean(formik.errors.uen) && formik.touched.uen) ||
        (Boolean(formik.errors.companyName) && formik.touched.companyName);

      if (!isInvalid && formik.values.uen && formik.values.companyName) {
        const data = await getTransactionId();

        localStorage.setItem("perfiosTransactionId", data.perfiosTransactionId);
      }
    }

    fetchTransactionId();
  }, [formik.values.uen, formik.values.companyName]);

  useEffect(() => {
    const formValues = formik.values;
    let step = 4;
    if (!formValues.tac.checkbox) step = 3;

    if (!formValues.uploadedFiles.length) step = 2;

    if (
      !formValues.name ||
      !formValues.position ||
      !formValues.email ||
      !formValues.confirmEmail ||
      !formValues.phoneNumber
    )
      step = 1;

    if (!formValues.uen || !formValues.companyName) {
      formik.setFieldValue("uen", formValues.uen.toUpperCase());
      step = 0;
    }

    setActiveStep(step);
  }, [formik.values]);

  const steps = [
    {
      label: "Company Information",
      Component: CompanyInformation,
    },
    {
      label: "Applicant Information",
      Component: ApplicantInformation,
    },
    {
      label: "Upload Documents",
      Component: UploadDocument,
    },
    {
      label: "Terms & Conditions",
      Component: TermAndCondition,
    },
  ];

  return (
    <Box sx={{ backgroundColor: "rgb(245, 248, 250);" }}>
      <form onSubmit={formik.handleSubmit}>
        <Paper
          sx={{
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: { xs: 2, md: 4 },
            paddingRight: { xs: 2, md: 4 },
            maxWidth: "1150px",
            margin: "auto",
          }}
        >
          <Stepper orientation="vertical" activeStep={activeStep}>
            {steps.map(({ label, Component }) => (
              <Step key={label} expanded={true}>
                <StepLabel sx={{ marginBottom: 2 }}>
                  <Box
                    sx={{
                      padding: "8px 16px",
                      color: "white",
                      borderRadius: "5px",
                      ml: 1,
                      background: "rgb(96, 26, 121)",
                      fontSize: {
                        xs: 16,
                        md: 20,
                      },
                    }}
                  >
                    {label}
                  </Box>
                </StepLabel>
                <StepContent>
                  <Component formik={formik} activeStep={activeStep} />
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ textAlign: "end", marginTop: 7 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.values.tac.checkbox}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
