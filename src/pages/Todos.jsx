import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoCompletion,
} from "@/features/TodosSlice";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/Button.jsx";
import FaIcon from "@/components/FaIcon";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";

const Todos = () => {
  const [inputTask, setInputTask] = useState({ addTask: "" });
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!inputTask.addTask.trim()) {
      // Display an error message or handle the empty task case
      toast.error("Please input a new task", {
        position: "top-center",
      });
      return; // Exit the function early if the task is empty
    }

    // Move toast.success outside of the render phase
    const successMessage = "Successfully add new task";
    toast.success(successMessage, {
      position: "top-center",
    });

    dispatch(
      addTodo({
        value: inputTask.addTask,
      })
    );

    setInputTask({ addTask: "" });
  };

  const handleUpdateTodo = (id) => {
    const updatedValue = prompt("Enter updated task value:");
    if (updatedValue !== null) {
      dispatch(updateTodo({ id, updatedValue }));
    }
  };
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheckedTodo = (id) => {
    dispatch(toggleTodoCompletion(id));
  };

  const onChangeInputTask = (e) => {
    setInputTask((prevInputTask) => ({
      ...prevInputTask,
      [e.target.name]: e.target.value,
    }));
  };

  const onCheckedTodo = (e) => {
    setInputTask((prevInputTask) => ({
      ...prevInputTask,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <div className="grid place-content-center h-full w-full">
      <div className="w-full border border-gray-50 rounded-md shadow-lg py-3">
        <div className="w-full border-b-2 rounded-lg rounded-b-none bg-blue-600 p-5">
          <input
            type="text"
            name="addTask"
            className="w-full border rounded-lg bg-gray-100 p-2 focus:outline-none focus:ring focus:border-blue-600"
            placeholder="Enter a new task"
            onChange={onChangeInputTask}
            value={inputTask.addTask}
          />
        </div>
        {todos &&
          todos.length > 0 &&
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col  md:flex-row justify-between items-center gap-1 my-5 px-4"
            >
              <>
                <label
                  className={`rounded-lg px-2 cursor-pointer ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  <input
                    id={`task-completed-${todo.id}`}
                    type="checkbox"
                    name={`task-completed-${todo.id}`}
                    onClick={() => handleCheckedTodo(todo.id)}
                    onChange={onCheckedTodo}
                    checked={todo.completed}
                  />
                  <span className="text-lg pl-4">
                    {todo.list.updatedValue !== undefined
                      ? todo.list.updatedValue
                      : todo.list.value}
                  </span>
                </label>
              </>

              <div className="flex items-center gap-8">
                {todo.completed && (
                  <button onClick={() => handleUpdateTodo(todo.id)}>
                    <FaIcon icon={faEdit} />
                  </button>
                )}

                {todo.completed && (
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    <FaIcon icon={faTrashCan} />
                  </button>
                )}
              </div>
            </div>
          ))}
        {todos && (
          <div className="border-t-2">
            <Button onClick={handleAddTodo} title="New Task" />
            <Toaster />
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
