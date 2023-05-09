import { configureStore } from "@reduxjs/toolkit";

import counterReducer  from "../slice/counterSlice";

import currentTaskGroupReducer from "../slice/currentTaskGroupSlice";

import taskGroupListReducer from "../slice/taskGroupListSlice";

import taskListReducer from "../slice/taskListSlice";

import currentTaskReducer from "../slice/currentTaskSlice";

export const store = configureStore({

    reducer: {
        danhPB: counterReducer,
        currentTaskGroup: currentTaskGroupReducer,
        taskGroupList: taskGroupListReducer,
        taskList: taskListReducer,
        currentTask: currentTaskReducer,
    },
})

//reducer -> tạo xong khai báo vào đây