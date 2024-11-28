import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md p-2">No</th>
            <th className="border border-slate-600 rounded-md p-2">Title</th>
            <th className="border border-slate-600 rounded-md p-2 hidden md:table-cell">
              Author
            </th>
            <th className="border border-slate-600 rounded-md p-2 hidden lg:table-cell">
              Publish Year
            </th>
            <th className="border border-slate-600 rounded-md p-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-10 hover:bg-gray-100">
              <td className="border border-slate-700 rounded-md text-center p-2">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2 hidden md:table-cell">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2 hidden lg:table-cell">
                {book.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BooksTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      publishYear: PropTypes.number,
    })
  ).isRequired, // books should be an array of objects, and is required
};

export default BooksTable;
