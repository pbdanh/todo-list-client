import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 12,
  //id = 0, title = "", active = false
  //nhan vao id title active true
  //xoa id = currentId active false
  //render if(state.active) (render)
  // active: true,//them nhieu gia tri
};

export const counterSlice = createSlice({
  name: "counteropasd ìlkadsjf", //ten cua redux //store: chua nhieu redux //get by name
  initialState, //lay phia tren la gia tri khoi tao
  reducers: {
    //khai bao cac action khi goi ham nao thi se thay doi ntn
    inc: (state) => {
      state.value += 1;
    },
    dec: (state) => {
      state.value -= 1;
    },
    incAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { inc, dec, incAmount } = counterSlice.actions; //action: những phương thức để thay đổi state(giá trị reducer)

export default counterSlice.reducer; //reducer(state, giá trị)
