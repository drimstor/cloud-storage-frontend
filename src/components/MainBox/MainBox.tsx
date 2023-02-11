import ControlPanel from "components/ControlPanel/ControlPanel";
import Browser from "./Browser";
import s from "./MainBox.module.scss";

function MainBox() {
  return (
    <div className={s.wrapper}>
      <ControlPanel />
      <Browser />
    </div>
  );
}

export default MainBox;
