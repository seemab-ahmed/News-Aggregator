import React, { useState } from "react";
import { ReactComponent as CrossIcon } from "../../images/crossIcon.svg";
import { searchNewsAtom } from "../../atoms/searchNewsAtom";
import { useRecoilState } from "recoil";

export const Search = () => {
  const [, setNewsSearch] = useRecoilState(searchNewsAtom);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setNewsSearch((prevNewsSearch) => ({
      ...prevNewsSearch,
      keyword: searchTerm,
      source:""
    }));
  };

  const handleClear = () => {
    setSearchTerm("");
    setNewsSearch((prevNewsSearch) => ({
      ...prevNewsSearch,
      keyword: "News",
    }));
  };

  return (
    <div className="relative sm:max-w-2xl md:max-w-5xl">
      <div className="overflow-hidden z-0 rounded-full relative p-1">
        <form
          className="relative flex z-50 bg-[#f5f5f5] rounded-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search News"
            className="bg-[#f5f5f5] rounded-full flex-1 px-6 py-2 text-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={handleChange}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 right-[105px] flex items-center px-4 text-gray-400 focus:outline-none"
              onClick={handleClear}
            >
              <CrossIcon />
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full font-semibold px-8 py-2 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
