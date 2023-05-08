import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskGroup: [],
};
export const taskGroupListSlice = createSlice({
  name: "taskGroupList",
  initialState,
  reducers: {
    SetTaskGroupList: (state, action) => {
      state.taskGroup = [...action.payload];
    },

    AddNewTaskGroup: (state, action) => {
      console.log(action.payload);
      state.taskGroup = [...state.taskGroup, action.payload];
    },
    UpdateTaskGroupList: (state, action) => {
      console.log("payload: ");
      console.log(action.payload);

      for(let item of state.taskGroup) {
        if(item.id == action.payload.id) {
          item.name = action.payload.name;
        }
      }
    },
    RemoveTaskGroupList: (state, action) => {
      state.taskGroup = state.taskGroup.filter((value) => {
        return value.id !== action.payload;
      });
    },
  },
});
export const {
  AddNewTaskGroup,
  SetTaskGroupList,
  UpdateTaskGroupList,
  RemoveTaskGroupList,
} = taskGroupListSlice.actions;
export default taskGroupListSlice.reducer;
