import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import TaskItem from "../TaskItem/TaskItem";

const CategoryContainer = ({
  category,
  addTask,
  isActive,
  closeInput,
  setActiveCategory,
  task,
  setTask,
  tasks,
  deleteTask,
}) => {
  const handleAddTaskClick = () => {
    if (isActive) {
      closeInput(); // Close the input box if the category is already active
    } else {
      setActiveCategory(category.id); // Otherwise, open the input box for this category
    }
  };

  console.log(tasks);

  return (
    <div className="bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor h-14 rounded-md rounded-b-none p-3 font-bold border-4 border-coloumnBackgroundColor">
        {category.title}
      </div>
      <div className="flex-grow flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
      {isActive ? (
        <div className="flex items-center gap-2 border-coloumnBackgroundColor border-2 rounded-md p-2 border-x-coloumnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500">
          <input
            type="text"
            placeholder="Enter task"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <AiOutlineCloseCircle
              onClick={closeInput}
              className="cursor-pointer"
              size={24}
            />
            <AiOutlineCheckCircle
              onClick={() => addTask(category.id)}
              className="cursor-pointer"
              size={24}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddTaskClick}
          className="flex gap-2 items-center border-coloumnBackgroundColor border-2 rounded-md p-4 border-x-coloumnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        >
          <CiCirclePlus />
          Add Task
        </button>
      )}
    </div>
  );
};

export default CategoryContainer;
