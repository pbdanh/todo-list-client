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
    SwitchImportantStatus: (state, action) => {
      for (let item of state.list) {
        if (item.id == action.payload) {
          item.important = !item.important;
        }
      }
    },
    UpdateTask: (state, action)  => {
      // console.log("!!");
      // console.log(action.payload)
      for(let task of state.list) {
        if(task.id == action.payload.id) {
          // console.log("hehe");
          task.title = action.payload.title;
          task.taskGroupId = action.payload.taskGroupId;
          task.complete = action.payload.complete;
          task.important = action.payload.important;
          task.note = action.payload.note;
        }
      }
    },
    DeleteTask: (state, action) => {
      state.list = state.list.filter((value) => {
        return value.id !== action.payload;
      });
    }
  },
});
export const { SetTaskList, AddNewTask, Test, SwitchImportantStatus, UpdateTask, DeleteTask } = taskListSlice.actions; //TODO : đổi tên cái test
export default taskListSlice.reducer;
