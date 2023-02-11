import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "components/UI-kit/Buttons/Button";
import { API_URL } from "config";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { setShowModal } from "redux/slices/messageSlice";
import { logout } from "redux/slices/userSlice";
import s from "./Header.module.scss";

function HeaderAvatar() {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.user.profile?.avatar);
  const [showMenu, setShowMenu] = useState(false);

  const closeMenuHandler = (variant?: string) => {
    setShowMenu(!showMenu);
    variant === "logout" && dispatch(logout());
    variant === "changeAvatar" && dispatch(setShowModal("changeAvatar"));
  };

  return (
    <>
      <div className={s.avatarBox} onClick={() => closeMenuHandler()}>
        {avatar ? (
          <img src={API_URL + avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className={clsx(s.avatarMenu, showMenu && s.showMenu)}>
        <Button
          onClick={() => closeMenuHandler("logout")}
          variant="outlined"
          size="small"
        >
          Logout
        </Button>
        <Button
          onClick={() => closeMenuHandler("changeAvatar")}
          variant="contained"
          size="small"
        >
          Change avatar
        </Button>
      </div>
    </>
  );
}

export default HeaderAvatar;
