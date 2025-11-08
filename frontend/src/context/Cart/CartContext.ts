import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  AddItemToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  AddItemToCart: () => {},
});

export const useCart = () => useContext(CartContext);
