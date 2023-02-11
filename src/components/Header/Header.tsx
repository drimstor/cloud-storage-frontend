import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/UI-kit/Buttons/Button";
import { useAppSelector } from "hooks/redux";
import { useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import HeaderAvatar from "./HeaderAvatar";

function Header() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.profile);

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <FontAwesomeIcon icon={faDatabase} />
        <h1>Cloud Storage</h1>
      </div>
      {!user ? (
        <div className={s.control}>
          <Button
            onClick={() => navigate("/sign-up")}
            variant="outlined"
            size="small"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/sign-in")}
            variant="contained"
            size="small"
          >
            Sign In
          </Button>
        </div>
      ) : (
        <HeaderAvatar />
      )}
    </header>
  );
}

export default Header;
