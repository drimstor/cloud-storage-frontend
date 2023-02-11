import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Button.module.scss";

interface iIconButton {
  icon: IconProp;
  secondIcon?: IconProp;
  thirdIcon?: IconProp;
  onClick?: () => void;
  state?: boolean;
}

function IconButton({
  icon,
  onClick,
  secondIcon,
  thirdIcon,
  state,
}: iIconButton) {
  return (
    <div className={s.iconButton} onClick={onClick}>
      {secondIcon ? (
        <>
          <FontAwesomeIcon icon={state ? icon : secondIcon} />
          {thirdIcon && <FontAwesomeIcon icon={state ? icon : thirdIcon} />}
        </>
      ) : (
        <FontAwesomeIcon icon={icon} />
      )}
    </div>
  );
}

export default IconButton;
