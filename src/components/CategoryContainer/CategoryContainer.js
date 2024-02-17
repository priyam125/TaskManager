import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const CategoryContainer = ({
  category,
  addTask,
  isActive,
  closeInput,
  setActiveCategory,
}) => {
  const [task, setTask] = useState("");

  const handleAddTaskClick = () => {
    if (isActive) {
      closeInput(); // Close the input box if the category is already active
    } else {
      setActiveCategory(category.id); // Otherwise, open the input box for this category
    }
  };

  return (
    <div className="bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor h-14 rounded-md rounded-b-none p-3 font-bold border-4 border-coloumnBackgroundColor">
        {category.title}
      </div>
      <div className="flex-grow">Content</div>
      {isActive ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter task"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="flex gap-2">
            <AiOutlineCloseCircle
              onClick={closeInput}
              className="cursor-pointer"
            />
            <AiOutlineCheckCircle
              onClick={() => addTask(category.id)}
              className="cursor-pointer"
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
