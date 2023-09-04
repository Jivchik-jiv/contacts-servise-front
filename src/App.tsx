import * as React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import routes from "./app/routes";
import Signin from "./features/Auth/Signin/Signin";
import Register from "./features/Auth/Register/Register";
import Contacts from "./features/Contacts/Contacts";
import PublicRoute from "./components/PublickRoute";
import PrivateRoute from "./components/PrivateRoure";
import Layout from "./components/Layout/Layout";
import { CssBaseline } from "@mui/material";
import Welcome from "./features/Welcom/Welcome";
import ContactView from "./features/Contacts/ContactView";
import Profile from "./features/Profile/Profile";
import ContactEdit from "./features/Contacts/ContactEdit";
import ProfileEdit from "./features/Profile/ProfileEdit";

const App = () => {
  return (
    <div>
      <CssBaseline />

      <Routes>
        <Route element={<Layout />}>
          <Route element={<PublicRoute />}>
            <Route index element={<Welcome />} />
            <Route path={routes.signin} element={<Signin />} />
            <Route path={routes.register} element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={routes.contacts} element={<Contacts />} />
            <Route path={routes.contactView} element={<ContactView />} />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.profileEdit} element={<ProfileEdit />} />
            <Route path={routes.contactEdit} element={<ContactEdit />} />
          </Route>
          <Route path='*' element={<h1>Not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
