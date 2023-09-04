import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { IContact } from "./Contacts";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  useDeleteContactMutation,
  useUpdateFriendsMutation,
} from "./contactsApiSlice";
import ContactDeleteConfirm from "./ContactDeleteConfirm";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface IContactItem {
  contact: IContact;
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
}

const ContactItem = ({ contact, setContacts }: IContactItem) => {
  const [openDelete, setOpenDelete] = React.useState(false);

  const navigate = useNavigate();

  const [deleteContact] = useDeleteContactMutation();
  const [updateFriens] = useUpdateFriendsMutation();

  const toContactView = () => {
    navigate(`${contact._id}`);
  };

  const toEdit = () => {
    navigate(`${contact._id}/edit`, { state: contact });
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteContact(contact._id);
      setContacts((prev) => {
        return prev.filter((cont) => cont._id !== contact._id);
      });
      console.log("Deleted: ", result);
    } catch (error) {
      console.log(
        "🚀 ~ file: ContactItem.tsx:62 ~ handleDeleteConfirm ~ error:",
        error
      );
    }

    setOpenDelete(false);
  };

  const handleFriends = async () => {
    try {
      await updateFriens({ id: contact._id, isFriend: !contact.isFriend });
      setContacts((prev) => {
        return prev.map((item) => {
          if (item._id === contact._id) {
            return { ...item, isFriend: !item.isFriend };
          }
          return item;
        });
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: ContactItem.tsx:72 ~ handleFriends ~ error:",
        error
      );
    }
  };

  return (
    <Box
      id={contact._id}
      sx={{
        "&:hover": {
          backgroundColor: "#ddd",
          "& button": {
            visibility: "visible",
          },
        },
        cursor: "pointer",
        p: 0,
        "& button": {
          visibility: "hidden",
        },
      }}
    >
      <ListItem sx={{ p: 0 }}>
        {contact.isFriend ? (
          <Tooltip title={"Remove from friends"}>
            <IconButton onClick={handleFriends} size='small'>
              <StarIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={"Add to friends"}>
            <IconButton onClick={handleFriends} size='small'>
              <StarBorderIcon />
            </IconButton>
          </Tooltip>
        )}

        <ListItemAvatar>
          <Avatar alt={contact.name} src={contact.avatar} />
        </ListItemAvatar>
        <ListItemText primary={contact.name} secondary={contact.phone} />
        <Tooltip title={"View"}>
          <IconButton onClick={toContactView} size='small'>
            <ContactPageIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Edit"}>
          <IconButton onClick={toEdit} size='small'>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete"}>
          <IconButton onClick={handleOpenDelete} size='small'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <ContactDeleteConfirm
          openDelete={openDelete}
          handleCloseDelete={handleCloseDelete}
          handleConfirm={handleDeleteConfirm}
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </Box>
  );
};

export default ContactItem;
