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
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState(
    () => localStorage.getItem("showType") || "table"
  );

  // Store `showType` in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("showType", showType);
  }, [showType]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/books")
      .then((res) => {
        setBooks(res.data.data);
        setFilteredBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = ({ title, author, publishYear }) => {
    const filtered = books.filter((book) => {
      return (
        (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
        (!author ||
          book.author?.toLowerCase().includes(author.toLowerCase())) &&
        (!publishYear || book.publishYear?.toString().includes(publishYear))
      );
    });
    setFilteredBooks(filtered);
  };

  const handleClearSearch = () => {
    setFilteredBooks(books);
  };

  const toggleShowType = () => {
    setShowType((prevType) => (prevType === "table" ? "card" : "table"));
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
        <Link to={"/books/create"} className="flex items-center gap-2 text-sky-800 text-lg hover:underline">
          <MdOutlineAddBox className="text-3xl md:text-4xl" />
        </Link>
      </div>
      {/* Books Display */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Home;
