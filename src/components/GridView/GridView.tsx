import React from "react";
import { iFile } from "types/files";
import s from "./GridView.module.scss";
import GridViewItem from "./GridViewItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SidebarBasket from "components/Sidebar/SidebarBasket/SidebarBasket";

function GridView({ files }: { files: iFile[] }) {
  return (
    <div className={s.wrapper}>
      <div className={s.gridBox}>
        <TransitionGroup>
          {!!files.length &&
            files.map((file) => (
              <CSSTransition
                key={file._id}
                timeout={300}
                exit={false}
                classNames="grid-file"
              >
                <GridViewItem file={file} />
              </CSSTransition>
            ))}
        </TransitionGroup>
        {!files.length && <p className={s.emptyFolder}>Folder is empty</p>}
      </div>
    </div>
  );
}

export default GridView;
