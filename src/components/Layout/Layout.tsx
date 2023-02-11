import Header from "components/Header/Header";
import { ReactNode } from "react";
import s from "./Layout.module.scss";
import Messages from "./Messages";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={s.wrapper}>
      <Header />
      {children}
      <Messages />
    </div>
  );
}

export default Layout;
