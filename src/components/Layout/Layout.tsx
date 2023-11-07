import Header from "components/Header/Header";
import { ReactNode } from "react";
import s from "./Layout.module.scss";
import Messages from "./Messages";
import PagesLoader from "components/UI-kit/Loaders/Loaders";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={s.wrapper}>
      <Header />
      {children}
      <PagesLoader />
      <Messages />
    </div>
  );
}

export default Layout;
