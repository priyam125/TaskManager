import React, { useEffect, useState } from "react";
import CategoryContainer from "../CategoryContainer/CategoryContainer";
import { DragDropContext } from "react-beautiful-dnd";

const TaskBoard = () => {
  const [categories, setCategories] = useState([
    { id: "1", title: "Added" },
    { id: "2", title: "Started" },
    { id: "3", title: "Completed" },
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

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If there's no destination, or if the draggable item is dropped back into its original position
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const updatedTasks = [...tasks];

    // If the task is moved within the same category
    if (source.droppableId === destination.droppableId) {
      const categoryTasks = updatedTasks.filter(
        (task) => task.categoryId === source.droppableId
      );
      const [removed] = categoryTasks.splice(source.index, 1);
      categoryTasks.splice(destination.index, 0, removed);

      // Update the state with the new order of tasks
      setTasks(
        updatedTasks.map((task) => {
          if (task.categoryId === source.droppableId) {
            return categoryTasks.shift();
          }
          return task;
        })
      );
    } else {
      // If the task is moved to a different category
      const sourceTasks = updatedTasks.filter(
        (task) => task.categoryId === source.droppableId
      );
      const destinationTasks = updatedTasks.filter(
        (task) => task.categoryId === destination.droppableId
      );

      // Find the task that is being dragged
      const [draggedTask] = sourceTasks.splice(source.index, 1);

      // Update the categoryId of the dragged task to the destination category
      draggedTask.categoryId = destination.droppableId;

      // Insert the dragged task into the destination category
      destinationTasks.splice(destination.index, 0, draggedTask);

      // Update the state with the new order of tasks
      setTasks(
        updatedTasks.filter((task) => {
          if (task.categoryId === source.droppableId) {
            return sourceTasks.shift();
          } else if (task.categoryId === destination.droppableId) {
            return destinationTasks.shift();
          }
          return task;
        })
      );
    }
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
