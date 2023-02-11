import SidebarPreview from "components/Sidebar/SidebarPreview/SidebarPreview";
import { useAppSelector } from "hooks/redux";
import s from "./Sidebar.module.scss";
import SidebarBasket from "./SidebarBasket/SidebarBasket";
import SidebarImages from "./SidebarImages";
import SidebarInfo from "./SidebarInfo";

function Sidebar() {
  const messages = useAppSelector((state) => state.messages);
  const backetState = useAppSelector((state) => state.control.backetState);
  return (
    <div className={s.wrapper}>
      <SidebarInfo />
      <SidebarImages />
      {!!messages.showSidebarPreview && <SidebarPreview />}
      {backetState.isShow && <SidebarBasket />}
    </div>
  );
}

export default Sidebar;
