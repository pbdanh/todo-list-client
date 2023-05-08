import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    taskGroup: [],
};
export const taskGroupListSlice = createSlice({
    name: 'taskGroupList',
    initialState,
    reducers: {

        SetTaskGroupList: (state, action) => {
            state.taskGroup = [...action.payload];
        },
        
        AddNewTaskGroup:(state, action) => {
            console.log(action.payload);
            state.taskGroup = [...state.taskGroup, action.payload];

        },
        UpdateTaskGroupList: (state, action) => {
            const updatedTaskGroup = state.find(group => group.id === action.payload.id);
            if (updatedTaskGroup) {
              Object.assign(updatedTaskGroup, action.payload);
            }
          },
        RemoveTaskGroupList: (state, action) => {
            state.taskGroup = state.taskGroup.filter((value) => {
              return value.id !== action.payload;
            });
          }
          


    }
});
export const {AddNewTaskGroup, SetTaskGroupList, UpdateTaskGroupList, RemoveTaskGroupList} = taskGroupListSlice.actions;
export default taskGroupListSlice.reducer;