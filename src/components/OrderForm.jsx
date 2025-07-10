import React, { useState } from "react";
import perfumes from "../data/perfumes";
import "./OrderForm.css";

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
    <section className="order-form-section" id="contact">
      <form className="order-form" onSubmit={handleSubmit}>
        <h2>Order Your Fragrance</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={handleChange}
        />

        <select name="productId" value={form.productId} onChange={handleChange}>
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
        />

        <textarea
          name="message"
          placeholder="Optional Message"
          rows="4"
          value={form.message}
          onChange={handleChange}
        />

        <p className="total-price">Total: ${total.toLocaleString()}</p>

        <button type="submit">Place Order via WhatsApp</button>
      </form>

<div className="contact-details">
  <h3>Need Assistance?</h3>
  <p>📞 Phone: +1 (212) 555-9876</p>
  <p>📧 Email: support@verraperfume.com</p>
  <p>📍 Location: New York, NY, USA</p>
  <p>⏰ Hours: Mon – Sat, 10AM – 7PM EST</p>
</div>
    </section>
  );
};

export default OrderForm;
