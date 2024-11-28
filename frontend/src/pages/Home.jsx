import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchParams, setSearchParams] = useState({});
  const limit = 10;

  const [showType, setShowType] = useState(
    () => localStorage.getItem("showType") || "table"
  );

  useEffect(() => {
    localStorage.setItem("showType", showType);
  }, [showType]);

  const fetchBooks = async (page = 1, params = {}) => {
    setLoading(true);
    const skip = (page - 1) * limit;
    try {
      const response = await axios.get("http://localhost:4000/books", {
        params: { ...params, limit, skip },
      });
      setBooks(response.data.data);
      setTotalBooks(response.data.total);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, searchParams);
  }, [currentPage, searchParams]);

  const handleSearch = ({ title, author, publishYear }) => {
    setSearchParams({ title, author, publishYear });
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleClearSearch = () => {
    setSearchParams({});
    setCurrentPage(1); // Reset to the first page on clearing search
  };

  const toggleShowType = () => {
    setShowType((prevType) => (prevType === "table" ? "card" : "table"));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(totalBooks / limit)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {/* Toggle Switch */}
      <div className="flex justify-center items-center my-4">
        <div className="flex items-center gap-4">
          <span
            className={`text-sm font-medium ${
              showType === "table" ? "text-sky-800" : "text-gray-400"
            }`}
          >
            Table
          </span>
          <button
            className="bg-gray-200 rounded-full w-16 h-8 relative focus:outline-none"
            onClick={toggleShowType}
          >
            <div
              className={`absolute top-0.5 left-1 w-6 h-6 rounded-full transform transition-transform duration-300 ${
                showType === "table"
                  ? "translate-x-0 bg-sky-800"
                  : "translate-x-8 bg-sky-600"
              }`}
            ></div>
          </button>
          <span
            className={`text-sm font-medium ${
              showType === "card" ? "text-sky-800" : "text-gray-400"
            }`}
          >
            Card
          </span>
        </div>
      </div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Books List</h1>
        <Link
          to={"/books/create"}
          className="flex items-center gap-2 text-sky-800 text-lg hover:underline"
        >
          <MdOutlineAddBox className="text-3xl md:text-4xl" />
        </Link>
      </div>
      {/* Books Display */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable currentPage={currentPage} books={books} />
      ) : (
        <BooksCard books={books} />
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(totalBooks / limit) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-sky-600 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalBooks / limit)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
