import React from "react";
import s from "styles/Home.module.scss";
import Sidebar from "components/Sidebar/Sidebar";
import MainBox from "components/MainBox/MainBox";

function Home() {
  return (
    <div className={s.wrapper}>
      <Sidebar /> <MainBox />
    </div>
  );
}

export default Home;
