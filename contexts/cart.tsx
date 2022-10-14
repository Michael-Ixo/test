import { createContext, useState, useEffect, HTMLAttributes } from 'react';

import { getLocalStorage, setLocalStorage } from '@utils/persistence';
import { CART, CART_ITEM } from 'types/cart';

export const CartContext = createContext({ cart: [] as CART, updateCart: (newCart: CART, override?: boolean) => {}, updateCartItem: (newCartItem: CART_ITEM, override?: boolean) => {} });

export const CartProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
	const [cart, setCart] = useState<CART>([]);
	const [loaded, setLoaded] = useState<boolean>(false);

	const updateCart = (newCart: CART, override: boolean = false) => {
		if (override) setCart(newCart);
		else setCart((currentCart: CART) => [...currentCart, ...newCart]);
	};

	const updateCartItem = (newCartItem: CART_ITEM, override: boolean = false) => {
		if (override) setCart((currentCart: CART) => [...currentCart, newCartItem]);
		else {
			setCart((currentCart: CART) => {
				const currentCartItem = currentCart.find(c => c.id === newCartItem.id);
				const filterCart = currentCart.filter(c => c.id !== newCartItem.id);
				if (currentCartItem) return [...filterCart, { ...currentCartItem, ...newCartItem }];
				else return [...currentCart, newCartItem];
			});
		}
	};

	useEffect(() => {
		if (loaded) setLocalStorage('cart', cart);
	}, [cart]);

	useEffect(() => {
		// Comment out below to reset cart
		// setLocalStorage('cart', []);
		const persistedCart = getLocalStorage<CART>('cart');
		setLoaded(true);
		if (persistedCart) setCart(persistedCart);
	}, []);

	const value = { cart, updateCart, updateCartItem };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
