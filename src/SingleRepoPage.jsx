import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleRepoPage() {
  const { repoId } = useParams();
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch repository data");
        }
        const data = await res.json();
        setRepoData(data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    };

    fetchRepoData();
  }, [repoId]);

  if (!repoData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{repoData.name}</h2>
      <p>Description: {repoData.description}</p>
      <p>Language: {repoData.language}</p>
      <p>Stars: {repoData.stargazers_count}</p>
      {/* Add more information as needed */}
    </div>
  );
}

export default SingleRepoPage;
