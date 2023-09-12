import * as React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAddContactMutation } from "./contactsApiSlice";
import { IContact } from "./Contacts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import validator from "validator";

interface IModal {
  setShowModal: (x: boolean) => void;
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
}

const AddContactForm = ({ setShowModal, setContacts }: IModal) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [wrongName, setWrongName] = React.useState(false);
  const [wrongPhone, setWrongPhone] = React.useState(false);
  const [wrongEmail, setWrongEmail] = React.useState(false);

  const [addContact] = useAddContactMutation();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setName(e.target.value);
      setWrongName(false);
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Проверка на валидность номера (только цифры и первым символом может быть плюс)
    if (/^\+?\d*$/.test(value) && value.length < 25) {
      setPhone(value);
      setWrongPhone(false);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 45) {
      setEmail(e.target.value);
      setWrongEmail(false);
    }
  };
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 45) {
      setCompany(e.target.value);
    }
  };

  const handleAddContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      name.length < 2 ||
      phone.length < 2 ||
      email.length < 5 ||
      !validator.isEmail(email)
    ) {
      setWrongName(name.length < 2);
      setWrongPhone(phone.length < 2);
      setWrongEmail(email.length < 5 || !validator.isEmail(email));
      return;
    }

    const contactObj = {
      name,
      phone,
      ...(email && { email }),
      ...(company && { company }),
    };

    try {
      const result: any | { error: FetchBaseQueryError | SerializedError } =
        await addContact(contactObj);

      if (result.data) {
        setContacts((prevContacts) => {
          return prevContacts.concat(result.data);
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: Modal.tsx:44 ~ handleAddContact ~ error:", error);
      return;
    }
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setShowModal(false);
  };
  return (
    <>
      <Typography variant='h6' component='h2'>
        Add contact
      </Typography>
      <Box component='form' onSubmit={handleAddContact} sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          autoComplete='Contact Name'
          autoFocus
          value={name}
          onChange={handleNameChange}
          error={wrongName}
          helperText={wrongName ? "Name must be 2 charactesrs long." : " "}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='phone'
          label='Phone'
          name='phone'
          autoComplete='Phone number'
          value={phone}
          onChange={handlePhoneChange}
          error={wrongPhone}
          helperText={wrongPhone ? "Phone must have 2 digits minimum." : " "}
        />
        <TextField
          margin='normal'
          fullWidth
          id='email'
          label='Email'
          name='email'
          autoComplete='Email'
          value={email}
          onChange={handleEmailChange}
          error={wrongEmail}
          helperText={wrongEmail ? "Invalid email." : " "}
        />
        <TextField
          margin='normal'
          fullWidth
          id='company'
          label='Company'
          name='company'
          autoComplete='Company'
          value={company}
          onChange={handleCompanyChange}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={!name || !phone}
        >
          Add Contact
        </Button>
      </Box>
    </>
  );
};

export default AddContactForm;
