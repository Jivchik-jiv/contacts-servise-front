import * as React from "react";
import { Alert } from "@mui/material";

const FailedLogin = () => {
  return (
    <Alert severity='error' sx={{ width: "100%" }}>
      Sign In Error. Incorrect Email or Password.
    </Alert>
  );
};

export default FailedLogin;
