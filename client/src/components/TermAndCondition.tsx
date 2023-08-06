import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

const conditions = [
  `I confirm that I am the authorized person to upload bank statements on behalf of my company`,
  `I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated`,
  `I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth`,
  <span key="last">
    I have read and understand the{" "}
    <Link href="https://smehealthcheck.credilinq.ai/terms-and-conditions">
      Terms & Conditions
    </Link>
  </span>,
];

const TermAndCondition = ({
  formik,
  activeStep,
}: {
  formik: any;
  activeStep: number;
}) => {
  return (
    <Box
      sx={{
        marginLeft: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: 24,
        gap: 2,
      }}
    >
      <FormControlLabel
        control={<Checkbox />}
        label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
        disabled={activeStep < 3}
        onChange={(_, checked) => {
          formik.setFieldValue("tac.checkbox", checked);
        }}
      />
      {conditions.map((condition, idx) => (
        <ListItem
          key={idx}
          sx={{ fontSize: "1rem", opacity: activeStep < 3 ? 0.38 : 1 }}
        >
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          {condition}
        </ListItem>
      ))}
    </Box>
  );
};

export default TermAndCondition;
