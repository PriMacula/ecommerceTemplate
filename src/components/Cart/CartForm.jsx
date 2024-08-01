"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation"; 

const governorates = [
  "Tunis",
  "Ariana",
  "Beja",
  "Ben Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Zaghouan",
];

const CartForm = ({ cartItems, productDetails, onOrderPlaced }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState(governorates[0]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderId = uuidv4();
    const shippingAddress = `${addressLine}, ${city}`;
    const totalAmount = cartItems.reduce((total, item) => {
      const product = productDetails[item.id] || {};
      return total + (product.price || 0) * item.quantity;
    }, 0);
    const products = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch("/api/Order/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          customerName: fullName,
          shippingAddress,
          status: "Pending",
          products,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("Order placed successfully:", data.order);

      if (onOrderPlaced) {
        await onOrderPlaced();
      }
      router.push(`/success?orderId=${orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-[#e8f2ea] flex flex-col gap-8 rounded-md md:mt-0">
      <form className="flex flex-col gap-8 p-4 sm:p-12" onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="flex gap-8 w-full justify-center">
          <div className="flex flex-col w-[45%] gap-2">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-transparent border-b-2 outline-none border-black focus:border-[#00b27d]"
              required
            />
          </div>
          <div className="flex flex-col w-[45%] gap-2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-transparent border-b-2 outline-none border-black focus:border-[#00b27d]"
              required
            />
          </div>
        </div>
        <div className="flex gap-8 w-full justify-center">
          <div className="flex flex-col w-[45%] gap-2">
            <label htmlFor="addressLine">Address Line</label>
            <input
              type="text"
              id="addressLine"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="bg-transparent border-b-2 outline-none border-black focus:border-[#00b27d]"
              required
            />
          </div>
          <div className="flex flex-col w-[45%] gap-2 mt-1">
            <label htmlFor="city">City</label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border-b-2 border-black outline-none bg-transparent focus:border-[#00b27d]"
              required
            >
              {governorates.map((governorat) => (
                <option key={governorat} value={governorat}>
                  {governorat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-[#e4f7f8b0] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">{cartItems.length} Article(s)</h3>
            <h2 className="text-lg font-bold">
              {cartItems.reduce((total, item) => {
                const product = productDetails[item.id] || {};
                return total + (product.price || 0) * item.quantity;
              }, 0)}{" "}
              TND
            </h2>
          </div>
          <div className="flex items-center justify-between pb-2 border-b-2">
            <h3 className="text-lg">Delivery Fees</h3>
            <h2 className="text-lg font-bold">0 TND</h2>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Total</h3>
            <h2 className="text-xl font-bold">
              {cartItems.reduce((total, item) => {
                const product = productDetails[item.id] || {};
                return total + (product.price || 0) * item.quantity;
              }, 0)}{" "}
              TND
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#00b27d] text-white text-xl font-semibold w-full p-3 rounded-md"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CartForm;
