import * as React from "react";
import { Container } from "@mui/material";
import { IContact } from "./Contacts";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import {
  IUpdateContact,
  useUpdateAvatarMutation,
  useUpdateContactMutation,
} from "./contactsApiSlice";
import EditForm from "../common/EditForm";

const ContactEdit = () => {
  const [contact, setContact] = React.useState<IContact | null>(null);

  const location = useLocation();

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const [updateContact] = useUpdateContactMutation();

  React.useEffect(() => {
    if (location.state) {
      const stateContact = location.state as IContact;
      setContact(stateContact);
    }
  }, [location.state]);

  const handleForm = async (updateObj: Partial<IUpdateContact>) => {
    if (contact) {
      try {
        const result = await updateContact({
          id: contact._id,
          contact: updateObj,
        });

        if ("data" in result) {
          return true;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: ContactEdit.tsx:202 ~ handleForm ~ error:",
          error
        );
        return false;
      }
    }

    return false;
  };

  const handleAvatar = async (file: FormData) => {
    if (contact) {
      try {
        const result = await updateAvatar({ id: contact._id, avatar: file });
        if ("data" in result) {
          const { newAvatar } = result.data as { newAvatar: string };
          setContact((prev) => {
            if (prev) {
              return { ...prev, avatar: newAvatar };
            }
            return prev;
          });
          return true;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: ContactEdit.tsx:201 ~ handleAvatar ~ error:",
          error
        );
      }
    }
    return false;
  };
  return (
    <>
      <Header title='Edit Contact' />
      <Container>
        {contact && (
          <EditForm
            handleForm={handleForm}
            handleAvatar={handleAvatar}
            isLoading={isLoading}
            contact={contact}
          />
        )}
      </Container>
    </>
  );
};

export default ContactEdit;
