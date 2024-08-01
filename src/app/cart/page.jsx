"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import CartForm from "@/components/Cart/CartForm";
import { isAuthenticated, getCart, fetchCartFromDB, removeFromCart, clearCart } from "@/utils/cart";

const fetchProductById = async (id) => {
  try {
    const response = await fetch(`/api/Product/getProductById?id=${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch product');
    }
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        const authenticated = await isAuthenticated();
        let items = [];
        if (authenticated) {
          items = await fetchCartFromDB();
        } else {
          items = getCart();
        }
        setCartItems(items);

        const fetchDetails = async () => {
          const details = {};
          for (const item of items) {
            const product = await fetchProductById(item.id);
            details[item.id] = product;
          }
          setProductDetails(details);
        };

        await fetchDetails();
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      setProductDetails((prevDetails) => {
        const { [productId]: _, ...remaining } = prevDetails;
        return remaining;
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleOrderPlaced = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-8 xl:px-18 2xl:px-28 py-8">
      <div className="h-16 bg-[#9cc7afb6] my-12 text-white font-bold text-3xl flex items-center justify-center gap-4">
        <FaCartShopping className="cursor-pointer" size={32} />
        <h1 className="tracking-wide">MY CART</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex flex-col gap-6 lg:w-1/2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const product = productDetails[item.id] || {};
              return (
                <div key={item.id} className="flex w-full">
                  <div className="relative w-1/4 flex">
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.title || "Product Image"}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col p-2 gap-4 w-3/4 border-b-2 border-black">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl">{product.title || "Unknown Product"}</h2>
                      <div className="flex gap-2">
                        <MdOutlineEdit className="cursor-pointer" size={20} />
                        <RiDeleteBinLine
                          className="cursor-pointer"
                          size={20}
                          onClick={() => handleRemove(item.id)}
                        />
                      </div>
                    </div>
                    <h3 className="text-sm">Quantity: {item.quantity}</h3>
                    <h2 className="text-[#FF0058] font-semibold text-sm">
                      {product.price ? `${product.price} TND` : 'N/A'}
                    </h2>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="lg:w-1/2">
          <CartForm cartItems={cartItems} productDetails={productDetails} onOrderPlaced={handleOrderPlaced} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
