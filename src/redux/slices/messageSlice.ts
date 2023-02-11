import { createSlice } from "@reduxjs/toolkit";
import { iSnackbar } from "components/UI-kit/Snackbar/Snackbar";
import { iUploadingFile } from "types/files";

interface iInitialState {
  showModalVariant:
    | null
    | "createFolder"
    | "uploadFile"
    | "deleteFile"
    | "changeAvatar"
    | "renameFile";
  showSidebarPreview: null | string;
  showContextMenu: null | {
    pageX: number;
    pageY: number;
    fileId?: string;
    variant: "fileOptions" | "folderOptions";
  };
  showSnackbar: iSnackbar[];
  showLoader: boolean;
  showUploader: {
    isShowUploader: boolean;
    uploadingFiles: iUploadingFile[];
  };
}

const initialState: iInitialState = {
  showModalVariant: null,
  showSidebarPreview: null,
  showContextMenu: null,
  showSnackbar: [],
  showLoader: false,
  showUploader: {
    isShowUploader: false,
    uploadingFiles: [],
  },
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setShowLoader(state, action) {
      state.showLoader = action.payload;
    },
    setShowModal(state, action) {
      state.showModalVariant = action.payload;
    },
    setShowSidebarPreview(state, action) {
      state.showSidebarPreview = action.payload;
    },
    setShowContextMenu(state, action) {
      state.showContextMenu = action.payload;
    },
    setShowSnackbar(state, action) {
      state.showSnackbar = [
        ...state.showSnackbar,
        { ...action.payload, id: Date.now() },
      ];
    },
    setRemoveSnackbar(state) {
      state.showSnackbar = [...state.showSnackbar.slice(1)];
    },
    setToggleShowUploader(state, action) {
      state.showUploader.isShowUploader = action.payload;
    },
    setAddUploadFile(state, action) {
      state.showUploader.uploadingFiles = [
        ...state.showUploader.uploadingFiles,
        { ...action.payload },
      ];
    },
    setClearUploadFiles(state) {
      state.showUploader.uploadingFiles = [];
    },
    setPercentLoading(state, action) {
      state.showUploader.uploadingFiles = [
        ...state.showUploader.uploadingFiles.map((file) =>
          file._id === action.payload._id
            ? {
                ...file,
                progress: action.payload.progress,
              }
            : { ...file }
        ),
      ];
    },
  },
});

export const {
  setShowModal,
  setShowSidebarPreview,
  setShowContextMenu,
  setShowSnackbar,
  setRemoveSnackbar,
  setPercentLoading,
  setAddUploadFile,
  setToggleShowUploader,
  setClearUploadFiles,
  setShowLoader,
} = messageSlice.actions;

export default messageSlice.reducer;
