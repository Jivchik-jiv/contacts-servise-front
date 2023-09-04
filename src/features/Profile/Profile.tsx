import * as React from "react";
import { useSelector } from "react-redux";
import { Container, Box, Avatar, Typography } from "@mui/material";
import Header from "../common/Header";
import { IProfile, selectProfile } from "./profileSlice";

const Profile = () => {
  const [profile, setProfile] = React.useState<IProfile | null>(null);

  const profileData = useSelector(selectProfile);

  React.useEffect(() => {
    if (profileData.id) {
      setProfile(profileData);
    }
  }, [profileData]);

  return (
    <>
      <Header title='Profile' />
      <Container>
        {profile && (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 150 }}>
              <Avatar
                src={profile.avatar}
                sx={{ width: 100, height: 100 }}
                alt={profile.name}
                variant='square'
              />
            </Box>
            <Box sx={{ mt: "20px" }}>
              <Typography>Name: {profile.name}</Typography>
              <Typography>Email: {profile.email}</Typography>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Profile;
