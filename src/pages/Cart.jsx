import useCartStore from "../store/cartStore";
import { useState } from "react";
import { sendCartToWhatsApp } from "../utils/whatsapp";
import toast from "react-hot-toast";

export default function Cart() {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!customerName || !address) {
      toast.error("Isi nama dan alamat dulu ya 🙏");
      return;
    }

    sendCartToWhatsApp(cart, customerName, address);

    clearCart();
    setCustomerName("");
    setAddress("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">
            Keranjang masih kosong 🛒
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* LIST PRODUK */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemTotal =
                Number(item.price) * item.quantity;

              const sisaStok =
                item.stock - item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow p-5 flex gap-4 items-center hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {item.name}
                    </h3>

                    <p className="text-orange-500 font-bold">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Subtotal: Rp {itemTotal.toLocaleString("id-ID")}
                    </p>

                    {/* Info stok sisa */}
                    {sisaStok <= 2 && sisaStok > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        Sisa {sisaStok} lagi!
                      </p>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-medium text-lg">
                        {item.quantity}
                      </span>

                      <button
                        disabled={item.quantity >= item.stock}
                        onClick={() => {
                          if (item.quantity >= item.stock) {
                            toast.error("Stok tidak cukup");
                            return;
                          }
                          increaseQuantity(item.id);
                        }}
                        className={`px-3 py-1 rounded ${
                          item.quantity >= item.stock
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if(confirm("yakkin mau hapus item ini?")){
                        removeFromCart(item.id);
                      }
                    }
                    }
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-20">
            <h2 className="text-lg font-semibold mb-4">
              Data Pemesan
            </h2>

            <input
              type="text"
              placeholder="Nama Lengkap"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              placeholder="Alamat Lengkap"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span className="text-orange-500">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-xl mt-6 hover:bg-green-700 transition font-semibold shadow-md"
            >
              Pesan via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
