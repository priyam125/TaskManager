import React, { useEffect, useState } from "react";
import CategoryContainer from "../CategoryContainer/CategoryContainer";
import { DragDropContext } from "react-beautiful-dnd";
import { initialData } from "../../utils";

const TaskBoard = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);

  // Load categories from localStorage on component mount
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // If no categories found in localStorage, initialize with default categories
      setCategories(initialData);
    }
  }, []);

  // Save categories to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const setActiveCategory = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const closeInput = () => {
    setActiveCategoryId(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log(source);
    console.log(destination);

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Get source and destination category
    const sourceIndex = source.droppableId - 1;
    const destIndex = destination.droppableId - 1;

    console.log("sourceIndex", sourceIndex);
    console.log("destIndex", destIndex);

    // if same category
    if (sourceIndex === destIndex) {
      const tasks = reorder(
        categories[sourceIndex].tasks,
        source.index,
        destination.index
      );
      const newData = [...categories];
      newData[sourceIndex].tasks = tasks;
      setCategories(newData);
    } else {
      const result = move(
        categories[sourceIndex].tasks,
        categories[destIndex].tasks,
        source,
        destination
      );
      const newData = [...categories];
      newData[sourceIndex].tasks = result[sourceIndex];
      newData[destIndex].tasks = result[destIndex];
      setCategories(newData);
    }
  };

  // move items within a category
  const reorder = (data, startIndex, endIndex) => {
    console.log("data", data);
    const clonedData = Array.from(data);
    console.log(clonedData);
    const [removed] = clonedData.splice(startIndex, 1);
    clonedData.splice(endIndex, 0, removed);

    return clonedData;
  };
  // move item from one category to another
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    console.log("sourceClone", sourceClone);
    console.log("destClone", destClone);
    const newSourceClone = [...sourceClone];
    console.log("droppableSource.index", droppableSource.index);
    console.log("droppableDestination.index", droppableDestination.index);
    const [removed] = newSourceClone.splice(droppableSource.index, 1);
    console.log("sourceClone", sourceClone);
    console.log("removed", [removed]);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId - 1] = newSourceClone;
    result[droppableDestination.droppableId - 1] = destClone;

    return result;
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
                setCategories={setCategories}
                activeCategoryId={activeCategoryId}
                categories={categories}
                setActiveCategory={setActiveCategory}
                isActive={activeCategoryId === item.id}
                closeInput={closeInput}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
