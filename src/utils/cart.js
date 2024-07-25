export const isAuthenticated = async () => {
  try {
    const response = await fetch('/api/check-auth', { method: 'GET' });
    const data = await response.json();
    if (response.ok) {
      return data.isLoggedIn;
    } else {
      console.error("Failed to check authentication:", data.error);
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const setCart = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart updated:', cart);
  }
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  setCart(cart);
};

export const removeFromCart = async (productId) => {
  if (await isAuthenticated()) {
    try {
      const response = await fetch('/api/removeFromCart', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }), 
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from server cart:', error);
    }
  } else {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  }
};

export const fetchCartFromDB = async () => {
  try {
    const response = await fetch('/api/cart', { method: 'GET' });
    const data = await response.json();
    if (response.ok) {
      return data.cart || [];
    } else {
      console.error("Failed to fetch cart from DB:", data.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching cart from DB:', error);
    return [];
  }
};

export const clearCart = async () => {
  if (await isAuthenticated()) {
    try {
      const response = await fetch('/api/clearCart', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart from database');
      }
    } catch (error) {
      console.error('Error clearing cart from server:', error);
    }
  } else {
    setCart([]);
  }
};
