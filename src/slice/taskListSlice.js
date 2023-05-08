import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    SetTaskList: (state, action) => {
      console.log("hehehe");
      console.log(action.payload);
      state.list = [...action.payload];
    },

    AddNewTask: (state, action) => {
      console.log("được đi mà :((");
      console.log(action.payload);
      state.list = [...state.list, action.payload];
    },
  },
});
export const { SetTaskList, AddNewTask, UpdateTask } = taskListSlice.actions;
export default taskListSlice.reducer;
