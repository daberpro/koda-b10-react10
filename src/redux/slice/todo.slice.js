import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "selectedTodo",
    initialState: {},
    reducers: {
        setNewSelected(prevState, { payload }) {
            return { ...prevState, ...payload };
        }
    }
});

export const { setNewSelected } = todoSlice.actions;
export default todoSlice.reducer;
