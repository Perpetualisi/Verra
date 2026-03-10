import React, { useState } from "react";
import perfumes from "../data/perfumes";

const OrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    productId: 1,
    quantity: 1,
    message: "",
  });

  const perfume = perfumes.find((p) => p.id === Number(form.productId));
  const price = Number(perfume.price.replace("$", ""));
  const total = price * form.quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "quantity" ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello Verra, I’d love to place an order:

🌸 Name: ${form.name}
📧 Email: ${form.email}
💎 Perfume: ${perfume.name}
🔢 Quantity: ${form.quantity}
💰 Total: $${total}
📝 Message: ${form.message || "(none)"}`;

    const whatsappURL = `https://wa.me/2348103558837?text=${encodeURIComponent(msg)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="bg-white/30 backdrop-blur-[12px] py-8 md:py-12 px-4 md:px-6 rounded-3xl max-w-[600px] mx-auto shadow-lg" id="contact">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h2 className="font-serif text-gray-800 text-lg md:text-xl text-center mb-4">Order Your Fragrance</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border-none bg-[#fffdfb] text-base shadow-inner"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border-none bg-[#fffdfb] text-base shadow-inner"
        />

        <select name="productId" value={form.productId} onChange={handleChange} className="px-4 py-3 rounded-xl border-none bg-[#fffdfb] text-base shadow-inner">
          {perfumes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border-none bg-[#fffdfb] text-base shadow-inner"
        />

        <textarea
          name="message"
          placeholder="Optional Message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border-none bg-[#fffdfb] text-base shadow-inner"
        />

        <p className="font-bold text-gray-800 text-center text-lg mt-2">Total: ${total.toLocaleString()}</p>

        <button type="submit" className="px-4 py-3 text-base bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-white border-none rounded-full cursor-pointer transition-transform duration-300 hover:scale-105">Place Order via WhatsApp</button>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-800 leading-relaxed">
        <h3 className="font-serif mb-4 text-black">Need Assistance?</h3>
        <p>📞 Phone: +1 (212) 555-9876</p>
        <p>📧 Email: support@verraperfume.com</p>
        <p>📍 Location: New York, NY, USA</p>
        <p>⏰ Hours: Mon – Sat, 10AM – 7PM EST</p>
      </div>
    </section>
  );
};

export default OrderForm;
