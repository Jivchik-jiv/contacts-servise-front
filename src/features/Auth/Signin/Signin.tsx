import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../authApiSlice";
import { useDispatch } from "react-redux";
import { setAuth } from "../authSlice";
import { setProfile } from "../../Profile/profileSlice";
import FailedLogin from "./FailedLogin";
import validator from "validator";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [isLoginFailed, setIsLoginFailed] = React.useState(false);

  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pass.length > 20 || email.length > 100 || !validator.isEmail(email)) {
      setIsLoginFailed(true);
      return;
    }

    try {
      const userData = await signin({ email, password: pass }).unwrap();

      if (userData.token) {
        dispatch(setAuth(userData.token));
        dispatch(setProfile(userData.user));
      }

      sessionStorage.setItem("token", userData.token);
      setEmail("");
      setPass("");
      navigate("/contacts");
    } catch (error) {
      setIsLoginFailed(true);
      console.log("We got error wile signin: ", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {isLoginFailed && <FailedLogin />}
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={!email || !pass}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Signin;
