/* eslint-disable react/prop-types */


export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map((pageNum) => pageNum + 1);

  return (
    <div className="flex justify-center mt-8">
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-1 rounded-full ${
            page === currentPage ? 'bg-indigo-700 text-white hover:scale-110 duration-300 transition-all' : 'bg-white text-indigo-700 border border-indigo-700 hover:scale-110 duration-300 transition-all'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
