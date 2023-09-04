import * as React from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useChangePasswordMutation } from "./profileApiSlice";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordForm = ({ setShowModal }: IProps) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConf, setNewPasswordConf] = React.useState("");
  const [wrongConf, setWrongConf] = React.useState(false);
  const [wrongNewPassword, setWrongNewPassword] = React.useState(false);
  const [wrongOldPassword, setWrongOldPassword] = React.useState(false);

  const [changePassword] = useChangePasswordMutation();

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 15) {
      setWrongOldPassword(false);
      setOldPassword(e.target.value);
    }
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 15) {
      setWrongConf(false);
      setWrongNewPassword(false);
      setNewPassword(e.target.value);
    }
  };

  const handleNewPasswordConf = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 15) {
      setWrongConf(false);
      setNewPasswordConf(e.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      newPassword !== newPasswordConf ||
      newPassword.length < 8 ||
      oldPassword.length < 8
    ) {
      setWrongConf(newPassword !== newPasswordConf);
      setWrongNewPassword(newPassword.length < 8);
      setWrongOldPassword(oldPassword.length < 8);
      return;
    }

    try {
      const result = await changePassword({ oldPassword, newPassword });
      if ("error" in result || !result.data) {
        setWrongOldPassword(true);
        return;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ChangePasswordForm.tsx:58 ~ handleSubmit ~ error:",
        error
      );
      return;
    }
    console.log("Password Changed");
    setShowModal(false);
  };
  return (
    <>
      <Typography variant='h6' component='h2'>
        Change Password
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='oldPassword'
          type='password'
          label='Old Password'
          name='Old Password'
          autoFocus
          value={oldPassword}
          onChange={handleOldPassword}
          error={wrongOldPassword}
          helperText={wrongOldPassword ? "Password is wrong" : " "}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          type='password'
          label='New Password'
          name='New Password'
          autoFocus
          value={newPassword}
          onChange={handleNewPassword}
          error={
            wrongNewPassword || oldPassword
              ? newPassword === oldPassword
              : false
          }
          helperText={
            wrongNewPassword
              ? "Password should be minimum 8 characters long"
              : oldPassword && newPassword === oldPassword
              ? "New password and old password must be different."
              : " "
          }
        />
        <TextField
          margin='normal'
          required
          fullWidth
          type='password'
          label='Confirm New Password'
          name='New Password'
          error={wrongConf}
          helperText={wrongConf ? "Passwords do not match" : " "}
          autoFocus
          value={newPasswordConf}
          onChange={handleNewPasswordConf}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={!(oldPassword && newPassword && newPasswordConf)}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ChangePasswordForm;
