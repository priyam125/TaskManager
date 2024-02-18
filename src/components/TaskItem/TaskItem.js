import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = ({ task, deleteTask, index }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative"
        >
          <div
            className={`bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative textarea-scrollbar ${
              snapshot.isDragging ? "bg-gray-950" : ""
            }`}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
              {task.task}
            </p>
            {isMouseOver && (
              <button
                onClick={() => deleteTask(task.id)}
                className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-coloumnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <CiTrash size={18} />
              </button>
            )}
          </div>
          {/* {snapshot.isDragging && (
            <div className="bg-gray-500 opacity-50 absolute top-0 left-0 w-full h-full z-10 rounded-xl"></div>
          )} */}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
