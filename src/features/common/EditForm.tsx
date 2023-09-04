import * as React from "react";
import { Box, Avatar, Button, FormControl, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IContact } from "../Contacts/Contacts";
import validator from "validator";
import { selectProfile } from "../Profile/profileSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUpdateContact } from "../Contacts/contactsApiSlice";

interface IProps {
  handleForm: (updateObj: Partial<IUpdateContact>) => Promise<boolean>;
  handleAvatar: (file: FormData) => Promise<boolean>;
  contact?: IContact;
  isLoading?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditForm = ({
  handleForm,
  handleAvatar,
  contact,
  isLoading,
  setShowModal,
}: IProps) => {
  const [img, setImg] = React.useState<File | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [phoneValid, setPhoneValid] = React.useState(true);
  const [dataChanged, setDataChanged] = React.useState(false);

  const profile = useSelector(selectProfile);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (contact) {
      contact.name && setName(contact.name);
      contact.email && setEmail(contact.email);
      contact.phone && setPhone(contact.phone);
      contact.company && setCompany(contact.company);
    } else if (profile) {
      profile.name && setName(profile.name);
      profile.email && setEmail(profile.email);
    }
  }, [contact, profile]);

  React.useEffect(() => {
    if (contact) {
      const nameSame = contact.name ? contact.name === name : name === "";
      const emailSame = contact.email ? contact.email === email : email === "";
      const phoneSame = contact.phone ? contact.phone === phone : phone === "";
      const companySame = contact.company
        ? contact.company === company
        : company === "";
      if (!nameSame || !phoneSame || !emailSame || !companySame) {
        setDataChanged(true);
        return;
      }
    }

    if (profile) {
      const nameSame = profile.name ? profile.name === name : name === "";
      const emailSame = profile.email ? profile.email === email : email === "";

      if (!nameSame || !emailSame) {
        setDataChanged(true);
        return;
      }
    }

    setDataChanged(false);
  }, [contact, name, email, phone, company, profile]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImg(file);
      event.target.value = "";
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 26) {
      setNameValid(true);
      setName(e.target.value);
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 26) {
      setPhone((prev) => {
        const phoneNumberRegex = /^\+?\d*$/;
        if (phoneNumberRegex.test(e.target.value)) {
          setPhoneValid(true);
          return e.target.value;
        }
        return prev;
      });
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 46) {
      setEmailValid(true);
      setEmail(e.target.value);
    }
  };

  const handleCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 46) {
      setCompany(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((dataChanged && contact) || (dataChanged && profile)) {
      let dataIsValid = true;

      if (name.length < 2) {
        setNameValid(false);
        dataIsValid = false;
      }

      if (phone.length < 2 && contact) {
        setPhoneValid(false);
        dataIsValid = false;
      }

      if (!email) {
        setEmailValid(true);
      } else if (email.length < 5 || !validator.isEmail(email)) {
        setEmailValid(false);
        dataIsValid = false;
      }

      if (!dataIsValid) {
        return;
      }
      let updateObj = {};

      if (contact) {
        const nameSame = contact.name ? contact.name === name : name === "";
        const emailSame = contact.email
          ? contact.email === email
          : email === "";
        const phoneSame = contact.phone
          ? contact.phone === phone
          : phone === "";
        const companySame = contact.company
          ? contact.company === company
          : company === "";

        updateObj = {
          ...(nameSame ? {} : { name }),
          ...(phoneSame ? {} : { phone }),
          ...(emailSame ? {} : email ? { email } : { email: null }),
          ...(companySame ? {} : company ? { company } : { company: null }),
        };
      } else if (profile) {
        const nameSame = profile.name ? profile.name === name : name === "";
        const emailSame = profile.email
          ? profile.email === email
          : email === "";

        updateObj = {
          ...(nameSame ? {} : { name }),
          ...(emailSame ? {} : email ? { email } : { email: null }),
        };
      }

      try {
        await handleForm(updateObj);
      } catch (error) {
        console.log(
          "🚀 ~ file: ContactEdit.tsx:94 ~ handleSubmit ~ error:",
          error
        );
      }
    }

    if (img) {
      try {
        const formData = new FormData();
        formData.append("avatar", img);
        const avatarUpdated = await handleAvatar(formData);
        if (avatarUpdated) {
          setImg(null);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: ContactEdit.tsx:75 ~ handleSubmit ~ error:",
          error
        );
      }
    }

    navigate(-1);
  };

  return (
    <>
      <FormControl
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ width: "100%" }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "25%", mt: "20px" }}>
            <Avatar
              src={
                img
                  ? URL.createObjectURL(img)
                  : contact
                  ? contact.avatar
                  : profile.avatar
              }
              sx={{ width: 100, height: 100, margin: "auto" }}
              alt={contact ? contact.name : profile.name}
              variant='square'
            />
            <Box
              sx={{
                textAlign: "center",
                margin: "10px auto",
              }}
            >
              <Button
                variant='contained'
                component='label'
                color='secondary'
                sx={{
                  textTransform: "none",
                  fontSize: "0.6rem",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  width: "110px",
                }}
              >
                Change Photo
                <input
                  type='file'
                  name='file'
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Box>
            {img && (
              <Button
                size='small'
                sx={{
                  margin: "auto",
                  display: "block",
                  textTransform: "none",
                  fontSize: "0.6rem",
                }}
                onClick={() => {
                  setImg(null);
                }}
              >
                Cancel
              </Button>
            )}
            {setShowModal && (
              <Box
                sx={{
                  textAlign: "center",
                  margin: "10px auto",
                }}
              >
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  sx={{
                    textTransform: "none",
                    fontSize: "0.6rem",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    width: "110px",
                  }}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Change Password
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ mt: "20px", width: "75%" }}>
            <TextField
              value={name}
              label='Name'
              sx={{ display: "block", marginTop: "10px" }}
              onChange={handleName}
              fullWidth
              error={!nameValid}
              helperText={
                nameValid ? " " : "Name is requiered, min lenght 2 characters"
              }
              InputLabelProps={{ shrink: true }}
            />
            {contact && (
              <TextField
                value={phone}
                label='Phone'
                sx={{ display: "block", marginTop: "10px" }}
                onChange={handlePhone}
                fullWidth
                error={!phoneValid}
                helperText={
                  phoneValid
                    ? " "
                    : "Phone is requiered, min lenght 2 characters"
                }
                InputLabelProps={{ shrink: true }}
              />
            )}
            <TextField
              value={email}
              label='Email'
              sx={{ display: "block", marginTop: "10px" }}
              onChange={handleEmail}
              fullWidth
              error={!emailValid}
              helperText={emailValid ? " " : "Email is not valid"}
              InputLabelProps={{ shrink: true }}
            />
            {contact && (
              <TextField
                value={company}
                label='Company'
                sx={{ display: "block", marginTop: "10px" }}
                onChange={handleCompany}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          </Box>
        </Box>
        <LoadingButton
          variant='contained'
          type='submit'
          color='secondary'
          sx={{ width: "50%", margin: "auto", mt: "20px" }}
          disabled={
            !nameValid || !emailValid || !phoneValid || (!dataChanged && !img)
          }
          loading={isLoading}
        >
          <span>Save Changes</span>
        </LoadingButton>
      </FormControl>
    </>
  );
};

export default EditForm;
