import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";

const TaskItem = ({ task, deleteTask }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grab relative"
    >
      {task.task}
      {isMouseOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-coloumnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <CiTrash size={18} />
        </button>
      )}
    </div>
  );
};

export default TaskItem;
