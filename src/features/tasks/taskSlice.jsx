import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task.push({ content: action.payload, done: false });
    },
    deleteTask: (state, action) => {
      state.task.splice(action.payload, 1);
    },
    toggleTaskDone: (state, action) => {
      state.task[action.payload].done = !state.task[action.payload].done;
    },
    editTask: (state, action) => {
      state.task[action.payload.index].content = action.payload.newContent;
    },
    clearAllTasks: (state) => {
      state.task = []; 
    },
  },
});

export const { addTask, deleteTask, toggleTaskDone, editTask, clearAllTasks } = taskSlice.actions;

export default taskSlice.reducer;
