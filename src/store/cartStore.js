import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set)=> ({
            cart:[],
               addToCart: (product) =>
                    set((state) => {
                        const existing = state.cart.find(
                        (item) => item.id === product.id
                        );

                        // Kalau stok habis
                        if (product.stock === 0) return state;

                        if (existing) {
                        // Jangan melebihi stok
                        if (existing.quantity >= product.stock) {
                            return state;
                        }

                        return {
                            cart: state.cart.map((item) =>
                            item.id === product.id
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                }
                                : item
                            ),
                        };
                        }

                        return {
                        cart: [
                            ...state.cart,
                            {
                            ...product,
                            quantity: 1,
                            },
                        ],
                        };
                    }),

                
                removeFromCart: (id) =>
                    set((state)=> ({
                        cart: state.cart.filter((item) => item.id !== id),
                    })),
                    clearCart: () => set({ cart: [] }),
                IncreaseQuantity: (id) =>
                    set((state)=>
                    ({
                        cart: state.cart.map((item) =>
                        item.id === id
                    ? {...item, quantity: item.quantity + 1} : item),
                    })),
                DecreaseQuantity: (id) =>
                    set((state)=>
                    ({
                        cart:state.cart.map((item)=> 
                        item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity - 1} : item),
                    })),
        }),
        {
            name: 'cart-storage',}
    )
);
export default useCartStore;