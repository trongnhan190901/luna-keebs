import { createContext, ReactNode, useContext, useState } from 'react';

interface ShoppingCartProviderProps {
    children: ReactNode;
}

interface ShoppingCartContext {
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeItem: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
}

interface CartItem {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0,
    );

    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 1;
    };

    const increaseItemQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 2 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseItemQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity == 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeItem = (id: number) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id != id);
        });
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeItem,
                cartQuantity,
                cartItems,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default function useShoppingCart() {
    return useContext(ShoppingCartContext);
}
