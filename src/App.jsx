 /* eslint-disable no-unused-vars */



import { useState, useEffect } from "react";
import Loading from "./Loading";
import Profile from "./Profile";
import Footer from "./Footer";
import Pagination from "./Pagination";
import NotFound from "./NotFound"; 

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 3; // Number of items per page
  const [user] = useState("PrinceAdegbite");

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(
        `https://api.github.com/users/${user}/repos?page=${currentPage}&per_page=${perPage}&sort=updated`
      );
      const data = await res.json();
      setItems(data);
      
      // Calculate total pages based on the number of items received and the items per page
      const totalCount = parseInt(res.headers.get('link').match(/page=(\d+).*last/)[1], 10);
      setTotalPages(totalCount);
    };

    fetchRepos();
  }, [currentPage, user, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to filter repositories based on search query
  const filteredItems = items.filter((item) => {
    const nameMatches = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const languageMatches =
      item.language &&
      item.language.toLowerCase().includes(searchQuery.toLowerCase());
    const visibilityMatches = item.private ? "private" : "public";
    return (
      nameMatches ||
      languageMatches ||
      visibilityMatches.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <div className="mx-auto ">
        <div className="p-6 mb-10 flex justify-between items-center  bg-indigo-700 max-[520px]:flex-col max-[520px]:gap-5">
          <h1 className="font-bold text-md text-white px-12  md:text-xl sm:text-lg">
            {user}&apos;s Github Repositories
          </h1>

          <div className="flex justify-center  ">
            <input
              type="text"
              placeholder="Search repositories..."
              className="px-4 py-2 border border-indigo-300 rounded-full active:border-indigo-700 focus:outline-none focus:ring  focus:ring-violet-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {!items ? (
          <Loading />
        ) : (
          <>
            {filteredItems.length === 0 ? (
              <NotFound /> // Render the NotFound component if no repositories are found
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-12 max-w-7xl mx-auto">
                {filteredItems.map((item) => (
                  <Profile
                    key={item.id}
                    item={item}
                    owner={item.owner}
                    name={item.name}
                    language={item.language}
                    watchers_count={item.watchers_count}
                    html_url={item.html_url}
                    stargazers_count={item.stargazers_count}
                    open_issues={item.open_issues}
                    created_at={item.created_at}
                  />
                ))}
              </div>
            )}
          </>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <div className="max-w-7xl mt-8 mb-8 flex mx-auto px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

