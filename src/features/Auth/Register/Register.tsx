import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Link from "@mui/material/Link";
import { useRegisterMutation } from "../authApiSlice";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [passConfirm, setPassConfirm] = React.useState("");
  const [wrongConfirm, setWrongConfirm] = React.useState(false);
  const [wrongName, setWrongName] = React.useState(false);
  const [wrongEmail, setWrongEmail] = React.useState(false);
  const [wrongPass, setWrongPass] = React.useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setName(e.target.value);
      setWrongName(false);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 45) {
      setEmail(e.target.value);
      setWrongEmail(false);
    }
  };
  const handelePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 15) {
      setPass(e.target.value);
      setWrongPass(false);
    }
  };
  const handlePassConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 15) {
      setPassConfirm(e.target.value);
      setWrongConfirm(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      pass !== passConfirm ||
      name.length < 2 ||
      pass.length < 8 ||
      email.length < 5 ||
      !validator.isEmail(email)
    ) {
      setWrongConfirm(pass !== passConfirm);
      setWrongName(name.length < 2);
      setWrongEmail(email.length < 5 || !validator.isEmail(email));
      setWrongPass(pass.length < 8);
      return;
    }

    try {
      const result = await register({ email, password: pass, name }).unwrap();
      if (result) {
        setEmail("");
        setPass("");
        setName("");
        navigate("/signin");
      }
    } catch (error) {
      console.log("We got error wile registation: ", error);
    }
  };

  return (
    <>
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
          <PersonAddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
            onChange={handleNameChange}
            value={name}
            error={wrongName}
            helperText={
              wrongName ? "Name mast be minimum 2 characters long." : " "
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={handleEmailChange}
            value={email}
            error={wrongEmail}
            helperText={wrongEmail ? "Email is not valid." : " "}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='confirm password'
            autoComplete='confirm-password'
            onChange={handelePassChange}
            value={pass}
            error={wrongPass}
            helperText={
              wrongPass ? "Password must be minimum 8 characters long." : " "
            }
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='confirm password'
            label='Confirm Password'
            type='password'
            id='confitm password'
            autoComplete='current-password'
            onChange={handlePassConfirmChange}
            value={passConfirm}
            error={wrongConfirm}
            helperText={wrongConfirm ? "Passwords does not match" : " "}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href='/signin' variant='body2'>
              {"Already have an account? Signin"}
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
