import * as React from "react";
import { IContact, contactMock } from "./Contacts";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Avatar, Typography, Button } from "@mui/material";
import Header from "../common/Header";
import routes from "../../app/routes";
import {
  useDeleteContactMutation,
  useGetContactByIdQuery,
} from "./contactsApiSlice";
import ContactDeleteConfirm from "./ContactDeleteConfirm";

const ContactView = () => {
  const [contact, setContact] = React.useState<IContact>(contactMock);
  const [openDelete, setOpenDelete] = React.useState(false);

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { data } = useGetContactByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteContact] = useDeleteContactMutation();

  React.useEffect(() => {
    if (data) {
      setContact(data);
    }
  }, [data]);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteContact(contact._id);
      console.log(
        "🚀 ~ file: ContactView.tsx:52 ~ handleDeleteConfirm ~ result:",
        result
      );

      navigate(routes.contacts);
    } catch (error) {
      console.log(
        "🚀 ~ file: ContactItem.tsx:62 ~ handleDeleteConfirm ~ error:",
        error
      );
    }
  };

  return (
    <>
      <Header title='Contact' contactData={contact} />
      <Container sx={{ display: "flex" }}>
        <Box sx={{ width: 150 }}>
          <Avatar
            src={contact.avatar}
            sx={{ width: 100, height: 100 }}
            alt={contact.name}
            variant='square'
          />
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Typography>Name: {contact.name}</Typography>
          <Typography>Phone: {contact.phone}</Typography>
          <Typography>Email: {contact.email}</Typography>
          <Typography>Company: {contact.company}</Typography>
          {contact.isFriend && <Typography>Friend</Typography>}
        </Box>
      </Container>
      <Box sx={{ textAlign: "center", mt: "20px" }}>
        <Button
          variant='contained'
          sx={{ backgroundColor: "grey" }}
          onClick={handleOpenDelete}
        >
          Delete
        </Button>
        <ContactDeleteConfirm
          openDelete={openDelete}
          handleCloseDelete={handleCloseDelete}
          handleConfirm={handleDeleteConfirm}
        />
      </Box>
    </>
  );
};

export default ContactView;
