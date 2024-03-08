import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

type ShoppingCartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, size: string) => void;
  decreaseCartQuantity: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    let sizes = ["SM", "MD", "LG", "XL"];
    let count = 0;
    for (let i = 0; i < sizes.length; i++) {
      let index = id.toString() + "-" + sizes[i];

      count += cartItems.find((item) => item.id === index)?.quantity || 0;
    }
    return count;
  }
  function increaseCartQuantity(id: number, size: string) {
    let index = id.toString() + "-" + size;
    setCartItems((currItems: any) => {
      if (currItems.find((item: any) => item.id === index) == null) {
        return [...currItems, { id: index, quantity: 1 }];
      } else {
        return currItems.map((item: any) => {
          if (item.id === index) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number, size: string) {
    let index = id.toString() + "-" + size;
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === index)?.quantity === 1) {
        return currItems.filter((item) => item.id !== index);
      } else {
        return currItems.map((item) => {
          if (item.id === index) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number, size: string) {
    let index = id.toString() + "-" + size;
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== index);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
