import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // null | 'tracking'
  const [currentOrder, setCurrentOrder] = useState(null);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing?.qty === 1) {
        return prev.filter(item => item.id !== productId);
      }
      return prev.map(item =>
        item.id === productId ? { ...item, qty: item.qty - 1 } : item
      );
    });
  }, []);

  const deleteFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getQty = useCallback((productId) => {
    return cartItems.find(item => item.id === productId)?.qty ?? 0;
  }, [cartItems]);

  const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const deliveryFee = itemTotal > 0 ? 25 : 0;
  const platformFee = itemTotal > 0 ? 5 : 0;
  const totalAmount = itemTotal + deliveryFee + platformFee;

  const placeOrder = useCallback(() => {
    const order = {
      id: `QD${Date.now()}`,
      items: cartItems,
      itemTotal,
      deliveryFee,
      platformFee,
      totalAmount,
      placedAt: new Date(),
    };
    setCurrentOrder(order);
    setOrderStatus('placed');
    clearCart();
    setIsCartOpen(false);
  }, [cartItems, itemTotal, deliveryFee, platformFee, totalAmount, clearCart]);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, deleteFromCart, clearCart, getQty,
      itemTotal, itemCount, deliveryFee, platformFee, totalAmount,
      isCartOpen, setIsCartOpen,
      orderStatus, setOrderStatus,
      currentOrder, setCurrentOrder,
      placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
