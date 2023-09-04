import * as React from "react";
import Typography from "@mui/material/Typography";
import { useGetContactsQuery } from "./contactsApiSlice";
import { Box, Container, Tab, Tabs } from "@mui/material";
import ContactItem from "./ContactItem";

import List from "@mui/material/List";
import Header from "../common/Header";

export interface IContact {
  name: string;
  phone: string;
  email: string;
  company: string;
  avatar: string;
  cloudAvatarId: string;
  isFriend: boolean;
  owner: string;
  _id: string;
}

export const contactMock: IContact = {
  name: "",
  phone: "",
  email: "",
  company: "",
  avatar: "",
  cloudAvatarId: "",
  isFriend: false,
  owner: "",
  _id: "",
};

const Contacts = () => {
  const [contacts, setContacts] = React.useState<IContact[]>([]);
  const [tab, setTab] = React.useState(0);

  const { data, isLoading } = useGetContactsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  React.useEffect(() => {
    if (data) {
      setContacts(data.contacts);
    }
  }, [data?.contacts, data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <Header title='Contacts' setContacts={setContacts} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab
            label='All contacts'
            sx={{
              width: "50%",
              "&:hover": { backgroundColor: "#ccc" },
              fontWeight: "bold",
            }}
          />
          <Tab
            label='Friends'
            sx={{
              width: "50%",
              "&:hover": { backgroundColor: "#ccc" },
              fontWeight: "bold",
            }}
          />
        </Tabs>
      </Box>
      <Container sx={{ textAlign: "center" }}>
        {!isLoading && !contacts.length && (
          <Typography component='p' variant='body2'>
            No Contacts
          </Typography>
        )}

        {isLoading && <h1>CONTACTS LOADING</h1>}

        {contacts.length ? (
          <List>
            {tab
              ? contacts
                  .filter((item) => item.isFriend)
                  .map((contact) => {
                    return (
                      <ContactItem
                        contact={contact}
                        setContacts={setContacts}
                        key={contact._id}
                      />
                    );
                  })
              : contacts.map((contact) => {
                  return (
                    <ContactItem
                      contact={contact}
                      setContacts={setContacts}
                      key={contact._id}
                    />
                  );
                })}
          </List>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Contacts;
