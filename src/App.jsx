import React, { useState } from "react";

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
    setSongs([...songs, { title: "New Song", artist: "Artist X", album: "New Album" }]);

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
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-xl border border-slate-100 w-full overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        🎵 Music Library
      </h2>

      {/* Search, Sort, Group Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6 w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 min-w-[160px] md:max-w-xs border border-gray-300 rounded-md px-3 py-2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-28 border border-gray-300 rounded-md px-3 py-2"

        >
          <option value="" disabled>Sort by</option>
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
        </select>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="w-28 border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="" disabled>Group By</option>
          <option value="">No Grouping</option>
          <option value="artist">Group by Artist</option>
          <option value="album">Group by Album</option>
        </select>
      </div>

      {/* Song List */}
      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-1">
        {Object.entries(grouped).map(([group, list]) => (
          <div key={group}>
            {groupBy && (
              <h3 className="text-lg font-semibold text-slate-600 mb-2 sticky top-0 bg-white z-10 py-1">
                {group}
              </h3>
            )}
            <ul className="space-y-3">
              {list.map((song, idx) => (
                <li
                  key={idx}
                  className="bg-white px-4 py-3 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition border border-gray-200"
                >
                  <span className="text-sm sm:text-base font-medium text-black">
                    {song.title} —{" "}
                    <span className="text-black font-normal">{song.artist}</span> ({song.album})
                  </span>
                  {role === "admin" && (
                    <button
                      onClick={() => deleteSong(song.title)}
                      className="text-sm text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Add Song Button (Admin Only) */}
      {role === "admin" && (
        <button
          onClick={addSong}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          ➕ Add Song
        </button>
      )}
    </div>
  );
}
