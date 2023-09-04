import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const Welcome = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          textAlign: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Welcome to Contacts Service!
        </Typography>
        <Typography component='p'>
          Please&nbsp;
          <Link href='/signin' variant='body2'>
            Signin
          </Link>{" "}
          or{" "}
          <Link href='/register' variant='body2'>
            Register
          </Link>{" "}
          to start using Contacts Service
        </Typography>
      </Box>
    </>
  );
};

export default Welcome;
