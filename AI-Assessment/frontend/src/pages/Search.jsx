import { useState } from "react";
import api from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState(false);

  const buildIndex = async () => {
    try {
      setBuilding(true);

      const res = await api.post("/search/build-index");

      alert(
        `${res.data?.message || "Index built successfully"}\nChunks: ${
          res.data?.chunks || 0
        }`
      );
    } catch (err) {
      console.log("Build index error:", err);

      alert(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Build index failed"
      );
    } finally {
      setBuilding(false);
    }
  };

  const searchDocs = async () => {
    if (!query.trim()) {
      alert("Please enter search query");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/search/", {
        query: query,
      });

      setResults([res.data?.answer]);
    } catch (err) {
      console.log("Search error:", err);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          AI Document Search
        </h1>

        {/* Build Index */}
        <button
          onClick={buildIndex}
          disabled={building}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
        >
          {building ? "Building Index..." : "Build Index (Admin)"}
        </button>

        {/* Search Box */}
        <div className="flex gap-3 mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask from uploaded documents..."
            className="flex-1 border border-gray-300 p-3 rounded-lg"
          />

          <button
            onClick={searchDocs}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Results */}
        <div className="mt-8 space-y-4">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow border border-gray-200"
              >
                <p className="text-gray-700 leading-7">{item}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6 text-center">
              No results yet. Build index and search.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}