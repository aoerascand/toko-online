import { Link } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../../store/cartStore";

export default function Navbar({ search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Hamburger Menu - Mobile Only */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white text-2xl p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              ☰
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white hover:text-orange-100 transition-colors group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">
                🏪
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  Warung All Item
                </span>
                <span className="text-xs text-orange-100">
                  Belanja Mudah, Harga Hemat
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop Only */}
            {setSearch && (
              <div className="hidden lg:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-slate-700 placeholder-slate-400"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔍
                  </span>
                </div>
              </div>
            )}

            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="relative group"
            >
              <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 border border-white/30">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  🛒
                </span>
                <span className="text-white font-semibold hidden sm:block">
                  Keranjang
                </span>
              </div>
              
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 py-0.5 rounded-full text-white font-medium">
                  {totalItems}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>

      {/* Sidebar - Mobile */}
      <>
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-orange-500 to-amber-500 shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl">🏪</span>
              <div>
                <h2 className="text-xl font-bold">Warung All Item</h2>
                <p className="text-xs text-orange-100">Belanja Mudah, Harga Hemat</p>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="text-white text-2xl hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              ✕
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="p-6 space-y-6">
            {/* Search Box - Only show if setSearch is provided */}
            {setSearch && (
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  🔍 Cari Produk
                </label>
                <input
                  type="text"
                  placeholder="Ketik nama produk..."
                  value={search || ""}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-slate-700 placeholder-slate-400"
                />
              </div>
            )}

            {/* Menu Links */}
            <div className="space-y-3">
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center gap-3 text-white hover:bg-white/20 p-4 rounded-xl transition-all font-semibold"
              >
                <span className="text-2xl">🏠</span>
                <span>Beranda</span>
              </Link>

              <Link
                to="/cart"
                onClick={closeSidebar}
                className="flex items-center justify-between text-white hover:bg-white/20 p-4 rounded-xl transition-all font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛒</span>
                  <span>Keranjang</span>
                </div>
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
            <p className="text-white/80 text-sm text-center">
              © 2024 Warung All Item
            </p>
          </div>
        </div>
      </>
    </>
  );
}