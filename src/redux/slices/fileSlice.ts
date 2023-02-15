import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config";
import { sortObject } from "helpers/sortObject";
import { iFile } from "types/files";
import {
  setShowSnackbar,
  setPercentLoading,
  setAddUploadFile,
  setToggleShowUploader,
  setShowLoader,
} from "./messageSlice";

interface iInitialState {
  files: iFile[] | [];
  storageSize: {
    media: number;
    picture: number;
    file: number;
    total: number;
  };
}

const initialState: iInitialState = {
  files: [],
  storageSize: {
    media: 0,
    picture: 0,
    file: 0,
    total: 0,
  },
};

export const getFiles = createAsyncThunk(
  "file/getFiles",
  async (dirId: any, { dispatch }) => {
    dispatch(setShowLoader(true));
    try {
      const response = await axios.get(
        `${API_URL}api/files${dirId ? `?parent=${dirId}` : ""}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    } finally {
      dispatch(setShowLoader(false));
    }
  }
);

// -------------------------- //

export const createFolder = createAsyncThunk(
  "file/createFolder",
  async (data: any, { dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files/`,
        {
          name: data.name,
          parent: data.parent,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "Folder created",
        })
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);

      if (data.dirId) {
        formData.append("parent", data.dirId);
      }

      if (data.file.size >= 2147483647) {
        dispatch(
          setShowSnackbar({
            message: "File size must not exceed 2GB",
            variant: "fail",
          })
        );
        return rejectWithValue({});
      }

      const uploadFile = {
        name: data.file.name,
        progress: 0,
        _id: Date.now(),
        size: data.file.size,
        type: data.file.type,
      };

      dispatch(setToggleShowUploader(true));
      dispatch(setAddUploadFile(uploadFile));

      const response = await axios.post(
        `${API_URL}api/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            if (total) {
              let percent = Math.floor((loaded * 100) / total);
              dispatch(
                setPercentLoading({ progress: percent, _id: uploadFile._id })
              );
            }
          },
        }
      );
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "The file has been uploaded",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
      return rejectWithValue({});
    }
  }
);

// -------------------------- //

export const downloadFile = createAsyncThunk(
  "file/downloadFile",
  async (file: any, { dispatch }) => {
    try {
      const response = await axios
        .get(`${API_URL}api/files/download?id=${file._id}`, {
          responseType: "blob",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((data) => data);
      const blob = await response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "Download started",
        })
      );
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async (id: any, { dispatch }) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      response.data.id = id;

      dispatch(
        setShowSnackbar({
          variant: "success",
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

export const searchFile = createAsyncThunk(
  "file/searchFile",
  async (name: any, { dispatch }) => {
    try {
      const response = await axios.get(
        `${API_URL}api/files/search?search=${name}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    } finally {
      dispatch(setShowLoader(false));
    }
  }
);

// -------------------------- //

export const renameFile = createAsyncThunk(
  "file/renameFile",
  async (data: any, { dispatch }) => {
    dispatch(setShowLoader(true));
    try {
      const response = await axios.post(`${API_URL}api/files/rename`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: `Name has changed to ${data.newName}`,
        })
      );
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    } finally {
      dispatch(setShowLoader(false));
    }
  }
);

// -------------------------- //

export const calculateFiles = createAsyncThunk(
  "file/calculateFiles",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}api/files/calculate`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: any) {
      return dispatch(
        setShowSnackbar({
          variant: "fail",
          message: error.response.data.message,
        })
      );
    }
  }
);

// -------------------------- //

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setSortFiles(state, action) {
      state.files = sortObject(
        state.files,
        action.payload.name,
        action.payload.order
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.files = action.payload;
    });

    // -------------------------- //

    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.files = [...state.files, action.payload];
    });

    // -------------------------- //

    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.files = [...state.files, action.payload];
    });

    // -------------------------- //

    builder.addCase(deleteFile.fulfilled, (state, action: any) => {
      state.files = [
        ...state.files.filter((file) => file._id !== action.payload.id),
      ];
    });

    // -------------------------- //

    builder.addCase(searchFile.fulfilled, (state, action) => {
      state.files = action.payload;
    });

    // -------------------------- //

    builder.addCase(renameFile.fulfilled, (state, action) => {
      state.files = [
        ...state.files.filter((file) => file._id !== action.payload._id),
        action.payload,
      ];
    });

    // -------------------------- //

    builder.addCase(calculateFiles.fulfilled, (state, action) => {
      state.storageSize = action.payload;
    });
  },
});

export const { setSortFiles } = fileSlice.actions;

export default fileSlice.reducer;
