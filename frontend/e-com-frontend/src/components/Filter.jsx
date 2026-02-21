import {FormControl,InputLabel,Select,MenuItem,Tooltip,Button} from "@mui/material"
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";


const Filter = () => {
  const categories = [
    { categoryId: 1, categorName: "Electronics" },
    { categoryId: 2, categorName: "Clothing" },
    { categoryId: 3, categorName: "Furniture" },
    { categoryId: 4, categorName: "Books" },
    { categoryId: 5, categorName: "Toys" },
  ];

  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between items-center gap-4">

      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="Search Products"
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-4 text-slate-800" />
      </div>

      <FormControl variant="outlined" size="small" className="text-slate-800 border-slate-700">
        <InputLabel id="category-select-label">Category</InputLabel>

        <Select
          labelId="category-select-label"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="all">All</MenuItem>

          {categories.map((item) => (
            <MenuItem key={item.categoryId} value={item.categorName}>
              {item.categorName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Tooltip title="Sorted by price">
        <Button variant="contained" color="primary" className="flex items-center gap-2 h-10">SortBy
            <FaArrowUp size={20} />
        </Button>
      </Tooltip>
      <button 
      className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none">
        <FiRefreshCw className="font-semibold" size={16}/>
        <span>Clear Filter</span>
      </button>

    </div>
  );
};

export default Filter;