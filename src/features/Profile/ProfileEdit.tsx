import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import Header from "../common/Header";
import { selectProfile, setAvatar, setProfile } from "./profileSlice";
import EditForm from "../common/EditForm";
import {
  useUpdateProfileAvatarMutation,
  useUpdateProfileMutation,
} from "./profileApiSlice";
import { IUpdateContact } from "../Contacts/contactsApiSlice";
import ModalWindow from "../common/ModalWindow";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfileEdit = () => {
  const [showModal, setShowModal] = React.useState(false);
  const profile = useSelector(selectProfile);

  const dispatch = useDispatch();

  const [updateProfileAvatar, { isLoading }] = useUpdateProfileAvatarMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const handleForm = async (updateObj: Partial<IUpdateContact>) => {
    const result = await updateProfile(updateObj);

    if ("data" in result) {
      dispatch(setProfile(result.data));
      return true;
    }

    return false;
  };

  const handleAvatar = async (file: FormData) => {
    const result = await updateProfileAvatar(file);
    if ("data" in result) {
      dispatch(setAvatar(result.data.newAvatar));
      return true;
    }
    return false;
  };

  return (
    <>
      <Header title='Edit Profile' />
      <Container>
        {profile && (
          <>
            <EditForm
              handleForm={handleForm}
              handleAvatar={handleAvatar}
              isLoading={isLoading}
              setShowModal={setShowModal}
            />
            <ModalWindow
              content={ChangePasswordForm}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ProfileEdit;
