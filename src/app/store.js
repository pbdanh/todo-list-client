import { configureStore } from "@reduxjs/toolkit";

import counterReducer  from "../slice/counterSlice";

import currentTaskGroupReducer from "../slice/currentTaskGroupSlice";

export const store = configureStore({

    reducer: {
        danhPB: counterReducer,
        currentTaskGroup: currentTaskGroupReducer,
    },
})

//reducer -> tạo xong khai báo vào đây