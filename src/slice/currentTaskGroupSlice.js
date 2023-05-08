import { createSlice } from "@reduxjs/toolkit";
// import counterSlice from "./counterSlice";

const initialState = {
  id: 0,
  name: "",
  changeName: false,
  active: false, //if(active) render taskGroupName, tasks, search
};

export const currentTaskGroupSlice = createSlice({
  name: "current task group",
  initialState,
  reducers: {
    setCurrentTaskGroup: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.changeName = action.payload.changeName;
      state.active = action.payload.active;
    },
    inactiveCurrentTaskGroup: (state) => {
      state.active = false;
    },
  },
});

export const { setCurrentTaskGroup, inactiveCurrentTaskGroup } =
  currentTaskGroupSlice.actions;

export default currentTaskGroupSlice.reducer;
