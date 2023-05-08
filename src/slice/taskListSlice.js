import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    SetTaskList: (state, action) => {
      console.log(action.payload);
      state.list = [...action.payload];
    },

    AddNewTask: (state, action) => {
      console.log(action.payload);
      state.list = [...state.list, action.payload];
    },
    Test: (state, action) => {
      for (let item of state.list) {
        if (item.id == action.payload) {
          item.complete = !item.complete;
        }
      }
    },
  },
});
export const { SetTaskList, AddNewTask, Test } = taskListSlice.actions; //TODO : đổi tên cái test
export default taskListSlice.reducer;
