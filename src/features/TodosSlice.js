import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  completed: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(list) {
        console.log(list);
        return {
          payload: {
            id: nanoid(),
            list,
            completed: false,
          },
        };
      },
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.list.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, updatedValue } = action.payload;
      const todo = state.list.find((item) => item.id === id);

      if (todo) {
        todo.list = {
          value: todo.list.value,
          updatedValue,
        };
      }
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, toggleTodoCompletion, updateTodo, deleteTodo } =
  todosSlice.actions;

export const selectTodos = (state) => state.todos.list;

export default todosSlice.reducer;
