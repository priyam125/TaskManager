import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import TaskItem from "../TaskItem/TaskItem";
import { Droppable } from "react-beautiful-dnd";
import "../../App.css";

const CategoryContainer = ({
  category,
  activeCategoryId,
  setActiveCategory,
  isActive,
  closeInput,
  categories,
  setCategories,
}) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    console.log(category);
  }, []);

  const handleAddTaskClick = () => {
    if (isActive) {
      closeInput(); // Close the input box if the category is already active
    } else {
      setActiveCategory(category.id); // Otherwise, open the input box for this category
    }
  };

  const addTask = (categoryId) => {
    if (task.trim() === "") return; // Don't add empty tasks

    const newTask = {
      id: Date.now().toString(), // Generate a unique ID for the task
      task: task,
    };

    const updatedCategories = categories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          tasks: [...cat.tasks, newTask],
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setTask(""); // Clear the input field after adding the task
    closeInput(); // Close the input box
  };

  const deleteTask = (taskId) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        return {
          ...cat,
          tasks: cat.tasks.filter((task) => task.id !== taskId),
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
  };

  return (
    <div className="bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor h-14 rounded-md rounded-b-none p-3 font-bold border-4 border-coloumnBackgroundColor">
        {category.title}
      </div>
      <Droppable droppableId={category.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-grow flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"
          >
            {category.tasks?.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isActive ? (
        <div className="flex items-center gap-2 border-coloumnBackgroundColor border-2 rounded-md p-2 border-x-coloumnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500">
          <textarea
            type="text"
            placeholder="Enter task"
            className="border border-gray-300 rounded-md p-2 w-full text-black textarea-scrollbar"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 h-full">
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
