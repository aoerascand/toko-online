import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (product.stock === 0) return;

    addToCart(product);

    toast.success(`${product.name} ditambahkan`, {
      duration: 2000,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 relative">
      
      {/* Badge Stok Habis */}
      {product.stock === 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          Stok Habis
        </span>
      )}

      <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
        />
        </div>


      <h3 className="font-semibold mt-3 text-gray-800 text-lg">
        {product.name}
      </h3>

      {/* Info stok */}
      <p className="text-sm text-gray-500 mt-1">
        Stok: {product.stock}
      </p>

      {/* Harga */}
      <p className="text-orange-500 font-bold mt-2 text-lg">
        Rp {Number(product.price).toLocaleString("id-ID")}
      </p>

      {/* Button */}
      <button
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        className={`w-full mt-4 py-2 rounded-xl text-white font-medium transition ${
          product.stock === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 active:scale-95"
        }`}
      >
        {product.stock === 0
          ? "Stok Habis"
          : "Tambah ke Keranjang"}
      </button>
    </div>
  );
}
