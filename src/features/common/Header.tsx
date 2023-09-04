import * as React from "react";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { IContact } from "../Contacts/Contacts";
import { useSignoutMutation } from "../Auth/authApiSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../Auth/authSlice";
import routes from "../../app/routes";
import { initialUser, setProfile } from "../Profile/profileSlice";
import { apiSlice } from "../../app/api/apiSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ModalWindow from "../common/ModalWindow";
import AddContactForm from "../Contacts/AddContactForm";

interface IProps {
  title: string;
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
  contactData: IContact;
}

const Header = ({ title, setContacts, contactData }: Partial<IProps>) => {
  const [signout] = useSignoutMutation();
  const [isContacts, setIsContacts] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname !== routes.contacts) {
      setIsContacts(false);
    } else {
      setIsContacts(true);
    }

    if (
      location.pathname.includes("edit") ||
      location.pathname === routes.contacts
    ) {
      setShowEdit(false);
    } else {
      setShowEdit(true);
    }
  }, [location]);

  const handleModal = () => {
    setShowModal((value) => !value);
  };

  const handleSignOut = async () => {
    try {
      await signout({});
      dispatch(signOut());
      dispatch(setProfile(initialUser.profile));
      sessionStorage.removeItem("token");
      dispatch(apiSlice.util.resetApiState());
      navigate(routes.signin);
    } catch (error) {
      console.log("🚀 ~ file: Header.tsx:50 ~ handleSignOut ~ error:", error);
    }
  };

  const handleEdit = () => {
    navigate(`${location.pathname}/edit`, { state: contactData });
  };

  return (
    <Box
      sx={{
        height: "50px",
        bgcolor: "bisque",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Typography variant='h4' component='h2'>
        {title}
      </Typography>

      {!isContacts && (
        <Box sx={{ position: "absolute", top: 0, left: 0 }}>
          <Tooltip title='Go back'>
            <IconButton color='secondary' onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        {showEdit && (
          <Tooltip title={"Edit"}>
            <IconButton color='secondary' onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        {isContacts && setContacts && (
          <>
            <Tooltip title={"Add contact"}>
              <IconButton color='secondary' onClick={handleModal}>
                <PostAddIcon />
              </IconButton>
            </Tooltip>
            <ModalWindow
              content={AddContactForm}
              setShowModal={setShowModal}
              setContacts={setContacts}
              showModal={showModal}
            />
            <Tooltip title={"Profile"}>
              <IconButton
                color='secondary'
                onClick={() => navigate(routes.profile)}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip title='Sign Out'>
          <IconButton color='secondary' onClick={handleSignOut}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
