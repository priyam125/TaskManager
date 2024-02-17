import React, { useState } from "react";
import CategoryContainer from "../CategoryContainer/CategoryContainer";

const TaskBoard = () => {
  const [categories, setCategories] = useState([
    { id: 1, title: "Added" },
    { id: 2, title: "Started" },
    { id: 3, title: "Completed" },
  ]);

  const [activeCategoryId, setActiveCategoryId] = useState(null); // State to track active category with open input box

  const setActiveCategory = (categoryId) => {
    setActiveCategoryId(categoryId); // Set the active category with open input box
  };

  const closeInput = () => {
    setActiveCategoryId(null); // Close the input box by setting active category to null
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const addTask = (categoryId) => {
    const newTask = {
      id: generateId(),
      categoryId,
    };
    console.log(newTask);
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
