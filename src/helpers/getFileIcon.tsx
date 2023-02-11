import folderIcon from "img/folderIcon.png";
import fileIcon from "img/gridFileIcon.png";
import pictureIcon from "img/gridPictureIcon.svg";
import mediaIcon from "img/gridMediaIcon.svg";
import gridFolderIcon from "img/gridFolderIcon.svg";
import gridPictureIcon from "img/gridPictureIcon.svg";
import gridFileIcon from "img/gridFileIcon.png";
import gridMediaIcon from "img/gridMediaIcon.svg";

export const getTableFileIcon = (type: string) => {
  switch (type) {
    case "dir":
      return folderIcon;
    case "file":
      return fileIcon;
    case "picture":
      return pictureIcon;
    case "media":
      return mediaIcon;
  }
};

export const getGridFileIcon = (type: string) => {
  switch (type) {
    case "dir":
      return gridFolderIcon;
    case "file":
      return gridFileIcon;
    case "picture":
      return gridPictureIcon;
    case "media":
      return gridMediaIcon;
  }
};
