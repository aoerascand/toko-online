import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import SearchFilter from "../components/product/SearchFilter";

export default function Home({ search, setSearch }) {
  const [category, setCategory] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || product.category === category)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Daftar Produk
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Temukan produk favorit Anda dari {products.length} pilihan tersedia
          </p>
        </div>

        {/* Search & Filter Section - Desktop */}
        <div className="mb-8 lg:block hidden">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </div>

        {/* Filter Section - Mobile (Category Only) */}
        <div className="mb-8 lg:hidden">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Filter Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            Menampilkan <span className="font-semibold text-indigo-600">{filteredProducts.length}</span> produk
            {category && <span className="ml-1">dalam kategori <span className="font-semibold text-indigo-600">{category}</span></span>}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-slate-500">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </div>
        )}

      </div>
    </div>
  );
}