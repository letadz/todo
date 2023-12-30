import { configureStore } from "@reduxjs/toolkit";
import TodosSlice from "@/features/TodosSlice";

export const store = configureStore({
  reducer: {
    todos: TodosSlice,
  },
});
