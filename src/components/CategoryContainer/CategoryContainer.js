import React, { useCallback, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import TaskItem from "../TaskItem/TaskItem";
import { Droppable } from "react-beautiful-dnd";
import "../../App.css";

const CategoryContainer = React.memo(
  ({ category, categories, setCategories }) => {
    const [task, setTask] = useState("");
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    useEffect(() => {
      console.log(category);
    }, []);

    const setActiveCategory = (categoryId) => {
      setActiveCategoryId(categoryId);
    };

    const closeInput = () => {
      setActiveCategoryId(null);
    };

    const handleAddTaskClick = () => {
      if (activeCategoryId === category.id) {
        closeInput();
      } else {
        setActiveCategory(category.id);
      }
    };

    const addTask = (categoryId) => {
      if (task.trim() === "") return;

      const newTask = {
        id: Date.now().toString(),
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
      setTask("");
      closeInput();
    };

    const deleteTask = useCallback(
      (taskId) => {
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
      },
      [categories, category.id, setCategories]
    );

    return (
      <Droppable droppableId={category.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col ${
              snapshot.isDraggingOver ? " border-blue-500 border" : ""
            }`}
          >
            <div className="bg-mainBackgroundColor h-14 rounded-md rounded-b-none p-3 font-bold border-4 border-coloumnBackgroundColor">
              {category.title}
            </div>
            <div className="flex-grow flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
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

            {activeCategoryId === category.id ? (
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
        )}
      </Droppable>
    );
  }
);

export default CategoryContainer;
