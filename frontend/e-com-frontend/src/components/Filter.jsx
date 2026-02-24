import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = () => {
  const categories = [
    { categoryId: 1, categorName: "Electronics" },
    { categoryId: 2, categorName: "Clothing" },
    { categoryId: 3, categorName: "Furniture" },
    { categoryId: 4, categorName: "Books" },
    { categoryId: 5, categorName: "Toys" },
  ];

  // http://localhost:xxxx/products?keyword=test&sortby=desc
  // http://localhost:yyyy/products?

  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";
    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(()=>{
        if(searchTerm){
            params.set("keyword",searchTerm);
        }
        else{
            params.delete("keyword");
        }
        navigate(`${pathname}?${params}`);
    },700);

    return ()=>{
        clearTimeout(handler);
    }
    

  },[searchTerm, navigate, pathname]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      params.delete("category");
    } else params.set("category", selectedCategory);
    navigate(`${pathname}?${params}`);
   
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  };

  

  const handleClearFilters = () => {
    navigate({ pathname: window.location.pathname });
  };


  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between items-center gap-4">
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="Search Products"
          onChange={(e)=> setSearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-4 text-slate-800" />
      </div>

      <FormControl
        variant="outlined"
        size="small"
        className="text-slate-800 border-slate-700"
      >
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
        <Button
          variant="contained"
          onClick={toggleSortOrder}
          color="primary"
          className="flex items-center gap-2 h-10"
        >
          SortBy
          {sortOrder === "asc" ? (
            <FaArrowUp size={20} />
          ) : (
            <FaArrowDown size={20} />
          )}
        </Button>
      </Tooltip>
      <button
        onClick={handleClearFilters}
        className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
      >
        <FiRefreshCw className="font-semibold" size={16} />
        <span>Clear Filter</span>
      </button>
    </div>
  );
};

export default Filter;
