type Routes = {
  [key: string]: string;
};

const routes: Routes = {
  welcome: "/welcome",
  signin: "/signin",
  register: "/register",
  contacts: "/contacts",
  contactView: "/contacts/:id",
  profile: "/profile",
  profileEdit: "/profile/edit",
  contactEdit: "/contacts/:id/edit",
};

export default routes;
