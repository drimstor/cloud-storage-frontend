import { configureStore, combineReducers } from "@reduxjs/toolkit";
import controlSlice from "./slices/controlSlice";
import fileSlice from "./slices/fileSlice";
import messageSlice from "./slices/messageSlice";
import userSlice from "./slices/userSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  files: fileSlice,
  messages: messageSlice,
  control: controlSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
