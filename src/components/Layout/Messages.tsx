import FileContextMenu from "components/ContextMenu/FileContextMenu";
import ModalDeleteFile from "components/Modals/ModalDeleteFile";
import ModalCreateFolder from "components/Modals/ModalCreateFolder";
import ModalUploadFile from "components/Modals/ModalUploadFile";
import { useAppSelector } from "hooks/redux";
import Snackbar from "../UI-kit/Snackbar/Snackbar";
import UploadingMenu from "components/UploadingMenu/UploadingMenu";
import snackbarStyles from "components/UI-kit/Snackbar/Snackbar.module.scss";
import ModalChangeAvatar from "components/Modals/ModalChangeAvatar";
import ModalRenameFile from "components/Modals/ModalRenameFile";

function Messages() {
  const messages = useAppSelector((state) => state.messages);
  return (
    <>
      {messages.showModalVariant === "createFolder" && <ModalCreateFolder />}
      {messages.showModalVariant === "uploadFile" && <ModalUploadFile />}
      {messages.showModalVariant === "deleteFile" && <ModalDeleteFile />}
      {messages.showModalVariant === "changeAvatar" && <ModalChangeAvatar />}
      {messages.showModalVariant === "renameFile" && <ModalRenameFile />}
      {messages.showUploader.isShowUploader && <UploadingMenu />}
      {messages.showContextMenu && <FileContextMenu />}

      <div className={snackbarStyles.snackbarBox}>
        {!!messages.showSnackbar.length &&
          messages.showSnackbar.map((snackbar) => (
            <Snackbar data={snackbar} key={snackbar.id} />
          ))}
      </div>
    </>
  );
}

export default Messages;
