import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTaskDone,
  editTask,
  clearAllTasks,
} from "../features/tasks/taskSlice";
import { FaTrashAlt, FaEdit, FaCheck } from "react-icons/fa";

const Todo = () => {
  const [userTask, setUserTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const tasks = useSelector((state) => state.taskReducer.task);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(userTask));
    setUserTask("");
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleToggleDone = (index) => {
    dispatch(toggleTaskDone(index));
  };

  const handleEditTask = (index, content) => {
    setIsEditing(index);
    setEditText(content);
  };

  const handleEditSubmit = (index) => {
    dispatch(editTask({ index, newContent: editText }));
    setIsEditing(null);
    setEditText("");
  };

  const handleMarkAllDone = () => {
    tasks.forEach((task, index) => {
      if (!task.done) {
        dispatch(toggleTaskDone(index));
      }
    });
  };

  const handleClearAll = () => {
    dispatch(clearAllTasks());
  };

  return (
    <div className="container max-w-xl p-6 mx-auto bg-white rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 sm:text-3xl">
        To-do List App
      </h1>
      <div className="mb-4">
        <form
          className="flex flex-col items-center gap-3 sm:flex-row"
          onSubmit={handleFormSubmit}
        >
          <input
            required
            type="text"
            value={userTask}
            onChange={(e) => setUserTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-grow w-full p-2 border border-gray-300 rounded-lg shadow-inner bg-slate-50 focus:outline-none focus:border-gray-800 sm:w-auto"
          />
          <button className="w-full px-4 py-2 text-white bg-green-600 border-none rounded-md hover:bg-green-700 sm:w-auto">
            Add Task
          </button>
        </form>
      </div>
      <ul className="max-h-[400px] p-4 overflow-auto rounded-lg shadow-inner bg-slate-50">
        {tasks.length > 0 ? (
          tasks.map((curTask, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-sm ${
                curTask.done ? "line-through text-gray-400" : "text-gray-700"
              } hover:bg-gray-100`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={curTask.done}
                  onChange={() => handleToggleDone(index)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                {isEditing === index ? (
                  <>
                    <input
                      value={editText}
                      className="flex-grow w-full p-1 border border-gray-300 rounded-lg shadow-inner bg-slate-50 focus:outline-none focus:border-gray-800 sm:w-auto"
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={() => handleEditSubmit(index)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  <p className="capitalize">
                    {index + 1}. {curTask.content}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditTask(index, curTask.content)}
                  className="text-blue-300 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-300 hover:text-red-600"
                  onClick={() => handleDeleteTask(index)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-2 font-bold text-center text-gray-700">
            No tasks available
          </li>
        )}
      </ul>
      <div className="flex justify-center gap-2 mt-4 text-center">
        <button
          onClick={handleMarkAllDone}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Mark All as Done
        </button>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 ml-4 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Clear All Tasks
        </button>
      </div>
    </div>
  );
};

export default Todo;
