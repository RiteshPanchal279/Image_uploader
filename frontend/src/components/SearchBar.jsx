import { useState } from "react";
import API from "../api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await API.get(`/image/search?name=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <div className="w-full mt-8 max-w-2xl mx-auto bg-white rounded-xl shadow p-4 space-y-4 border border-gray-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Images"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Results:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((img) => (
              <div key={img._id} className="border rounded-lg overflow-hidden">
                <img
                  src={img.imageUrl}
                  alt={img.name}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
