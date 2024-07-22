import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import Loader from "../loader/loader";
import { AppContext } from "../../contexts/AppContext";
import { TAppContext } from "../../types/appTypes";

export default function AuthRequired(): JSX.Element {
  const { isLoggedIn } = useContext(AppContext) as TAppContext;

  return (
    <div className="w-screen h-screen page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
      <div className="w-screen h-screen grid place-content-center">
        <div className="content-cntr relative overflow-y-auto">
          {isLoggedIn === null ? (
            <Loader />
          ) : isLoggedIn ? (
            <Outlet />
          ) : (
            <Navigate to="/sign-in" replace={true} />
          )}
        </div>
      </div>
    </div>
  );
}
