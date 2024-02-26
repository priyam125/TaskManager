import React, { useCallback, useState } from "react";
import { CiTrash } from "react-icons/ci";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = React.memo(({ task, deleteTask, index }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const handlePriority = () => {};
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
              snapshot.isDragging ? "opacity-80 border-blue-500 border" : ""
            }`}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
              {task.task}
            </p>
            {isMouseOver && (
              <button
                onClick={() => deleteTask(task.id)}
                className="stroke-white absolute right-4 top-1 translate-y-[20%] bg-coloumnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
              >
                <CiTrash size={18} />
              </button>
            )}
            {/* {isMouseOver && (
              <div
                onClick={() => handlePriority("high")}
                className="absolute right-20 bottom-1 -translate-y-[20%] cursor-pointer"
              >
                <FcHighPriority size={24} />
              </div>
            )}
            {isMouseOver && (
              <div className="absolute right-12 bottom-1 -translate-y-[20%] cursor-pointer">
                <FcMediumPriority size={24} />
              </div>
            )}
            {isMouseOver && (
              <div className="absolute right-4 bottom-1 -translate-y-[20%] cursor-pointer">
                <FcLowPriority size={24} />
              </div>
            )} */}
          </div>
          {/* {snapshot.isDragging && (
            <div className="bg-gray-500 opacity-50 absolute top-0 left-0 w-full h-full z-10 rounded-xl"></div>
          )} */}
        </div>
      )}
    </Draggable>
  );
});

export default TaskItem;
