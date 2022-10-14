import { CART } from 'types/cart';

export const cartTotal = (cart: CART) => cart.reduce((prev, cur) => ({ price: (prev.price ?? 0) + (cur.price ?? 0) }), {}).price ?? 0;
