import { createSlice } from "@reduxjs/toolkit";

interface iInitialState {
  viewVariant: "list" | "grid";
  currentDir: string | null;
  dirStack: {
    id: string;
    name: string;
  }[];
  sort: {
    name: string;
    order: number;
  };
  backetState: {
    isShow: boolean;
    isConfirm: boolean;
    isCancel: boolean;
  };
  multiSelect: {
    isActive: boolean;
    items: string[];
  };
}

const initialState: iInitialState = {
  viewVariant: "list",
  currentDir: null,
  dirStack: [],
  multiSelect: {
    isActive: false,
    items: [],
  },
  sort: {
    name: "type",
    order: 1,
  },
  backetState: {
    isShow: false,
    isConfirm: false,
    isCancel: false,
  },
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    setActiveMultiSelect(state) {
      state.multiSelect.isActive = !state.multiSelect.isActive;
    },
    setAddItemsMultiSelect(state, action) {
      state.multiSelect.items = [
        ...state.multiSelect.items,
        action.payload,
      ];
    },
    setDeleteItemMultiSelect(state, action) {
      state.multiSelect.items = state.multiSelect.items.filter(
        (item) => item !== action.payload
      );
    },
    setClearItemsMultiSelect(state) {
      state.multiSelect.items = [];
    },
    setBacketState(state, action) {
      state.backetState = action.payload;
    },
    setViewVariant(state, action) {
      state.viewVariant = action.payload;
    },
    setCurrentDir(state, action) {
      state.currentDir = action.payload;
    },
    setPushToStack(state, action) {
      state.dirStack = [...state.dirStack, action.payload];
    },
    setPopFromStack(state, action) {
      state.dirStack = state.dirStack.filter(
        (dir: { id: string; name: string }) =>
          !Object.values(dir).includes(action.payload.id)
      );
    },
    setNewStack(state, action) {
      const index = state.dirStack.findIndex(
        (dir) => dir.id === action.payload.id
      );
      state.dirStack = state.dirStack.slice(0, index + 1);
    },
    setSortName(state, action) {
      state.sort = {
        ...state.sort,
        name: action.payload,
      };
    },
    setSortOrder(state, action) {
      state.sort = {
        ...state.sort,
        order: action.payload,
      };
    },
  },
});

export const {
  setViewVariant,
  setCurrentDir,
  setPushToStack,
  setPopFromStack,
  setNewStack,
  setSortName,
  setSortOrder,
  setBacketState,
  setActiveMultiSelect,
  setAddItemsMultiSelect,
  setDeleteItemMultiSelect,
  setClearItemsMultiSelect,
} = controlSlice.actions;

export default controlSlice.reducer;
