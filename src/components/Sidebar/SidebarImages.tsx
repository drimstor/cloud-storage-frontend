import React, { memo } from "react";
import s from "./Sidebar.module.scss";
import folder1 from "img/folderIcon1.svg";
import folder2 from "img/folderIcon2.svg";
import folder3 from "img/folderIcon3.svg";
import folder4 from "img/folderIcon4.svg";
const foldersArray = [folder4, folder3, folder2, folder1];

function SidebarImages() {
  return (
    <div className={s.foldersBox}>
      {foldersArray.map((folder, index) => (
        <img src={folder} key={index} alt="folder" />
      ))}
    </div>
  );
}

export default memo(SidebarImages);
