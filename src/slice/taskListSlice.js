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
    Test: (state, action) => {
      console.log("@@");
      // let current = state.list.filter((value) => {
      //   return value.id === action.payload;
      // })
      // current.complete = !current.complete;
      for(let item of state.list) {
        if(item.id == action.payload) {
          item.complete = !item.complete;
        }
      }
    },
  },
});
export const { SetTaskList, AddNewTask, Test } = taskListSlice.actions; //TODO : đổi tên cái test
export default taskListSlice.reducer;
