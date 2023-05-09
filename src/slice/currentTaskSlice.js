import { createSlice } from "@reduxjs/toolkit";
import { SwitchImportantStatus } from "./taskListSlice";

const initialState = {
  id: 0,
  title: "Test",
  note: "This is note",
  taskGroupId: 0,
  complete: false,
  important: false,
  active: false,
};

export const currentTaskSlice = createSlice({
  name: "current task",
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.note = action.payload.note;
      state.taskGroupId = action.payload.taskGroupId;
      state.complete = action.payload.complete;
      state.important = action.payload.important;
      state.active = true;
    },
    inactiveCurrentTask: (state) => {
      state.active = false;
    },
    SwitchCurrentTaskCompleteStatus: (state, action) => {
      if(state.id == action.payload) {
        state.complete = !state.complete;
      }
      
    },
    SwitchCurrentTaskImportantStatus: (state, action) => {
      if(state.id == action.payload) {
        state.important = !state.important;
      }
     
    }
  },
});

export const { setCurrentTask, inactiveCurrentTask, SwitchCurrentTaskCompleteStatus, SwitchCurrentTaskImportantStatus } =
  currentTaskSlice.actions;

export default currentTaskSlice.reducer;
