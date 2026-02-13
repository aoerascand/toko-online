export function sendCartToWhatsApp(cart, name, address) {
  let message = `Halo, saya ingin pesan:\n\n`;

  cart.forEach((item) => {
    message += `- ${item.name} (${item.qty}x) - Rp ${item.price.toLocaleString("id-ID")}\n`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  message += `\nTotal: Rp ${total.toLocaleString("id-ID")}`;
  message += `\n\nNama: ${name}`;
  message += `\nAlamat: ${address}`;

  const phoneNumber = "6285796633875"; // Ganti nomor kamu
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}
