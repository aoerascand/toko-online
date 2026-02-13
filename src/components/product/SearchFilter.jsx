export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  categories
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      
      <input
        type="text"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Semua Kategori</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

    </div>
  );
}
