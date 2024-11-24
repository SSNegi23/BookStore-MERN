import PropTypes from "prop-types";
import { useState } from "react";

const SearchBar = ({ onSearch, onClear }) => {
  const [searchFields, setSearchFields] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const handleSearch = () => {
    onSearch(searchFields);
  };

  const handleClear = () => {
    setSearchFields({ title: "", author: "", publishYear: "" });
    onClear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4 items-center my-4 sm:flex-row sm:justify-between">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="text"
          name="title"
          value={searchFields.title}
          onChange={handleChange}
          placeholder="Search by Title"
          className="border px-3 py-2 rounded-md w-40"
        />
        <input
          type="text"
          name="author"
          value={searchFields.author}
          onChange={handleChange}
          placeholder="Search by Author"
          className="border px-3 py-2 rounded-md w-40"
        />
        <input
          type="text"
          name="publishYear"
          value={searchFields.publishYear}
          onChange={handleChange}
          placeholder="Search by Year"
          className="border px-3 py-2 rounded-md w-40"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-800"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Callback function for search action
  onClear: PropTypes.func.isRequired, // Callback function to clear the search
};

export default SearchBar;
