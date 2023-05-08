import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../slice/counterSlice";

export const store = configureStore({
  reducer: {},
});

//reducer -> tạo xong khai báo vào đây
