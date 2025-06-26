import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummySongs = [
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  { title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line" },
  { title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?" },
  { title: "Shape of You", artist: "Ed Sheeran", album: "Divide" },
  { title: "Peaches", artist: "Justin Bieber", album: "Justice" },
  { title: "Save Your Tears", artist: "The Weeknd", album: "After Hours" },
  { title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia" },
  { title: "Circles", artist: "Post Malone", album: "Hollywood's Bleeding" },
  { title: "Senorita", artist: "Shawn Mendes", album: "Shawn Mendes" },
  { title: "drivers license", artist: "Olivia Rodrigo", album: "SOUR" },
  { title: "Stay", artist: "The Kid LAROI", album: "Stay" },
  { title: "Sunflower", artist: "Post Malone", album: "Hollywood's Bleeding" },
  { title: "Easy On Me", artist: "Adele", album: "30" },
  { title: "As It Was", artist: "Harry Styles", album: "Harry's House" },
];

export default function MusicLibrary({ role }) {
  const [songs, setSongs] = useState(dummySongs);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("");

  const addSong = () =>
    setSongs([
      ...songs,
      { title: "New Song", artist: "Artist X", album: "New Album" },
    ]);

  const deleteSong = (title) =>
    setSongs(songs.filter((s) => s.title !== title));

  const filtered = songs.filter((song) =>
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    song.album.toLowerCase().includes(search.toLowerCase()) ||
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  const grouped = groupBy
    ? sorted.reduce((acc, song) => {
        const key = song[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {})
    : { All: sorted };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 sm:p-8 bg-white/20 dark:bg-gray-800/30 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 backdrop-blur-md w-full max-h-[80vh] overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-center text-blue-800 dark:text-blue-200 mb-6">
        🎵 Music Library
      </h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-md px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-36 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-md px-3 py-2"
          >
            <option value="title">Sort by Title</option>
            <option value="artist">Sort by Artist</option>
            <option value="album">Sort by Album</option>
          </select>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="w-full sm:w-36 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-md px-3 py-2"
          >
            <option value="">No Grouping</option>
            <option value="artist">Group by Artist</option>
            <option value="album">Group by Album</option>
          </select>
        </div>
      </div>

      {/* Song List */}
      <div className="space-y-6 overflow-y-auto pr-1 max-h-[48vh]">
        {Object.entries(grouped).map(([group, list]) => (
          <div key={group}>
            {groupBy && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur z-10 py-1 px-1 rounded"
              >
                {group}
              </motion.h3>
            )}
            <ul className="space-y-3">
              <AnimatePresence>
                {list.map((song, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700"
                  >
                    <span className="flex items-center gap-2 text-sm sm:text-base font-medium text-black dark:text-white">
                      <button
                        title="Play"
                        className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      {song.title} —{" "}
                      <span className="font-normal">{song.artist}</span>{" "}
                      <span className="text-gray-600 dark:text-gray-400">
                        ({song.album})
                      </span>
                    </span>

                    {role === "admin" && (
                      <button
                        onClick={() => deleteSong(song.title)}
                        className="text-sm text-red-600 dark:text-red-400 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>

      {role === "admin" && (
        <motion.button
          onClick={addSong}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          ➕ Add Song
        </motion.button>
      )}
    </motion.div>
  );
}
