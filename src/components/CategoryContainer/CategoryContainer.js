import React from "react";

const CategoryContainer = ({ category }) => {
  return (
    <div className="bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor h-14 rounded-md rounded-b-none p-3 font-bold border-4 border-coloumnBackgroundColor">
        {category.title}
      </div>
      <div className="flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};

export default CategoryContainer;
