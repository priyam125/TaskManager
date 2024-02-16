import React, { useState } from "react";
import CategoryContainer from "../CategoryContainer/CategoryContainer";

const TaskBoard = () => {
  const [categories, setCategories] = useState([
    { id: 1, title: "Added" },
    { id: 2, title: "Started" },
    { id: 3, title: "Completed" },
  ]);
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {categories.map((item) => (
            <CategoryContainer category={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
