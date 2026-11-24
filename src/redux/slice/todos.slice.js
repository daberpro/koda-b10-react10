import { createSlice } from "@reduxjs/toolkit";


const todosSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTask(prevState, { payload }) {
            return [...prevState, payload];
        },
        editTask(prevState, { payload }) {
            const indexToUpdate = prevState.findIndex((todo) => {
                return todo.id == payload.id;
            });
            const copyPrevState = [...prevState];
            copyPrevState[indexToUpdate] = { ...payload };
            return copyPrevState;
        },
        removeTask(prevState, { payload }) {
            return prevState.filter((todo) => todo.id != payload);
        },
    },
});

export const { addTask, editTask, removeTask } = todosSlice.actions;
export default todosSlice.reducer;
