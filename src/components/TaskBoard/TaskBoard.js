import React, { useEffect, useState } from "react";
import CategoryContainer from "../CategoryContainer/CategoryContainer";

const TaskBoard = () => {
  const [categories, setCategories] = useState([
    { id: 1, title: "Added" },
    { id: 2, title: "Started" },
    { id: 3, title: "Completed" },
  ]);

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const [activeCategoryId, setActiveCategoryId] = useState(null); // State to track active category with open input box

  const setActiveCategory = (categoryId) => {
    setActiveCategoryId(categoryId); // Set the active category with open input box
  };

  const closeInput = () => {
    setActiveCategoryId(null);
  };

  useEffect(() => {
    setTask("");
  }, [activeCategoryId]);

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const addTask = (categoryId) => {
    const newTask = {
      id: generateId(),
      categoryId,
      task,
    };
    console.log(newTask);
    setTask("");
    closeInput();

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {categories.map((item) => (
            <CategoryContainer
              key={item.id}
              category={item}
              addTask={addTask}
              setActiveCategory={setActiveCategory}
              isActive={activeCategoryId === item.id}
              closeInput={closeInput}
              task={task}
              setTask={setTask}
              tasks={tasks.filter((task) => task.categoryId === item.id)}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
