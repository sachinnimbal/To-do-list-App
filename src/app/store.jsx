import { configureStore } from "@reduxjs/toolkit";
import taskReducer, {
  addTask,
  toggleTaskDone,
} from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    taskReducer,
  },
});

console.log(store.getState());
console.log(store.dispatch(addTask("Buy groceries")));
console.log(store.getState());
console.log(store.dispatch(addTask("Clean the house")));
console.log(store.getState());
console.log(store.dispatch(addTask("Finish Homework")));
console.log(store.getState());
console.log(store.dispatch(addTask("Prepare Dinner")));
console.log(store.getState());
console.log(store.dispatch(addTask("Read a Book")));
console.log(store.getState());
console.log(store.dispatch(addTask("Call Mom")));
console.log(store.getState());
console.log(store.dispatch(toggleTaskDone(2)));
console.log(store.getState());
