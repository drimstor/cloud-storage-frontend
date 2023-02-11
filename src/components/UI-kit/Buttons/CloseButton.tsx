import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "../Tooltip/ToolTip";
import s from "./Button.module.scss";

interface iCloseButton {
  onClick: () => void;
}

function CloseButton({ onClick }: iCloseButton) {
  return (
    <div className={s.closeButton} onClick={onClick}>
      <ToolTip title={"Hide"}>
        <FontAwesomeIcon icon={faXmark} />
      </ToolTip>
    </div>
  );
}

export default CloseButton;
