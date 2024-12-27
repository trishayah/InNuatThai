import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value); // Trigger the search callback with the input value
  };

  return (
    <div className="flex items-left justify-left ml-4 mt-4">
      <div className="flex items-center w-full sm:w-[400px] h-[40px] bg-white rounded-[10px] mb-4 pl-3 font-poppins hover:ring-2 hover:ring-[#105D2B] shadow-md border border-[#105D2B]">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent text-black text-sm sm:text-base focus:outline-none pl-2"
          onChange={handleSearch}
        />
        <div className="searchicon">
          <MdSearch className="px-4 pl-1" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
