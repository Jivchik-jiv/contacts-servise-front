import * as React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setAuth } from "../../features/Auth/authSlice";
import { IProfile, setProfile } from "../../features/Profile/profileSlice";
import { useLazyGetProfileQuery } from "../../features/Profile/profileApiSlice";
import { apiSlice } from "../../app/api/apiSlice";

const Layout = () => {
  const token = useSelector(selectToken);

  const [needAuth, setNeedAuth] = React.useState(false);

  const [trigger, result] = useLazyGetProfileQuery({});

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!token) {
      const storageToken = sessionStorage.getItem("token");
      if (storageToken) {
        dispatch(setAuth(storageToken));
        trigger({});
      } else {
        setNeedAuth(true);
      }
    }

    if (result.isLoading) {
      return;
    }

    if (result.isSuccess) {
      dispatch(setProfile(result.currentData as IProfile));
      return;
    }

    if (result.isError) {
      sessionStorage.removeItem("token");
      dispatch(setAuth(null));
      dispatch(apiSlice.util.resetApiState());
      return;
    }
  }, [
    dispatch,
    token,
    trigger,
    result.isLoading,
    result.isSuccess,
    result.isError,
    result.currentData,
  ]);

  return (
    <div className={styles.layout}>
      {result.isSuccess || result.isError || needAuth ? <Outlet /> : <></>}
    </div>
  );
};

export default Layout;
