import { HTMLAttributes, useContext } from 'react';
import cls from 'classnames';
import Link from 'next/link';

import styles from '@components/card/card.module.scss';
import Card from '@components/card/card';
import { CartContext } from '@contexts/cart';
import CartIcon from '@icons/cart.svg';
import { cartTotal } from '@utils/cart';

type CartProps = {} & HTMLAttributes<HTMLDivElement>;

const Cart = ({ className, ...other }: CartProps) => {
	const { cart } = useContext(CartContext);
	const cartNotEmpty = cart.length > 0;

	return (
		<Link href={`/cart`}>
			<a>
				<Card className={cls(styles.detailsCard, className, { [styles.accentBgColor]: cartNotEmpty, [styles.invertedTextColor]: cartNotEmpty })} {...other}>
					<CartIcon width={45} height={45} color="#000" className={cartNotEmpty ? styles.invertedImgColor : null} />
					<div className={styles.textContainer}>
						<div className={cls(styles.amountContainer, styles.spaceBetween)}>
							<span className={styles.amount}>{cart.length}</span>
							{cart.length === 1 ? 'stove in cart' : 'stoves in cart'}
						</div>
						<p className={styles.text}>
							<strong>${cartTotal(cart)}</strong> total
						</p>
					</div>
				</Card>
			</a>
		</Link>
	);
};

export default Cart;
