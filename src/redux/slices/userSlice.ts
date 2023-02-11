import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config";
import { iLoginUser, iUser } from "types/users";
import { setShowSnackbar } from "./messageSlice";

interface iInitialState {
  profile: iUser | null;
  isLoading: boolean;
  token: string | null;
}

const initialState: iInitialState = {
  profile: null,
  isLoading: false,
  token: null,
};

export const registration = createAsyncThunk(
  "user/registration",
  async (data: iLoginUser, { dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}api/auth/registration`,
        data
      );

      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "User created",
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

export const login = createAsyncThunk(
  "user/login",
  async (data: Omit<iLoginUser, "name" | "file">, { dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email: data.email,
        password: data.password,
      });
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "Welcome!",
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

export const auth = createAsyncThunk("user/auth", async (_) => {
  try {
    const response = await axios.get(`${API_URL}api/auth/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("token");
  }
});

// -------------------------- //

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (file: any, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${API_URL}api/files/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
    }
  }
);

// -------------------------- //

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (_, { dispatch }) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.profile = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(auth.fulfilled, (state, action) => {
      state.profile = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(registration.fulfilled, (state, action) => {
      state.profile = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });

    // -------------------------- //

    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    // -------------------------- //

    builder.addCase(deleteAvatar.fulfilled, (state, action: any) => {
      state.profile = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
