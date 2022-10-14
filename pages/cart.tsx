import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/homePage.module.scss';
import Footer from '@components/footer/footer';
import { DetailsCard } from '@components/card/card';
import Stove from '@icons/stove.svg';
import Crypto from '@icons/crypto.svg';
import Card from '@icons/card.svg';
import Global from '@icons/global.svg';
import SadFace from '@icons/sad-face.svg';
import Loader from '@components/loader/loader';
import { CartContext } from '@contexts/cart';
import Cart from '@components/cart/cart';
import IconText from '@components/icon-text/icon-text';
import Link from 'next/link';
import CryptoPurchase from '@components/crypto-purchase/crypto-purchase';
import Fail from '@icons/fail.svg';
import { WalletContext } from '@contexts/wallet';

const CartPage: NextPage = () => {
	const { cart, updateCartItem } = useContext(CartContext);
	const { wallet, createSession } = useContext(WalletContext);
	const [walletError, setWalletError] = useState(false);
	const [showWallet, setShowWallet] = useState(false);
	const cartNotEmpty = cart.length > 0;

	return (
		<>
			<Head>
				<title>Cart</title>
				<meta name="description" content="Supamoto Purchase dApp Cart" />
			</Head>

			<main className={cls(utilsStyles.main)}>
				<h1 className={styles.title}>EMERGING COOKSTOVE IMPACT TOKENS</h1>

				<section className={utilsStyles.section}>
					<Cart />

					{showWallet ? (
						<CryptoPurchase />
					) : (
						<>
							<div className={utilsStyles.columnCenter}>
								{walletError ? (
									<IconText Img={Fail} text="Error connecting to wallet." text2="Please try again." />
								) : cartNotEmpty ? (
									<IconText Img={Global} text="How would you like to pay" />
								) : (
									<IconText Img={SadFace} text="Your cart is empty" />
								)}
							</div>
							{cartNotEmpty ? (
								<>
									<DetailsCard Img={Card} onClick={() => {}}>
										pay with creditcard
									</DetailsCard>
									<DetailsCard Img={Crypto} onClick={() => setShowWallet(true)}>
										pay with crypto
									</DetailsCard>
									<DetailsCard Img={Crypto} onClick={() => createSession()}>
										Wallet Connect
									</DetailsCard>
								</>
							) : (
								<Link href="/">
									<a>
										<DetailsCard Img={Stove}>shop some stoves</DetailsCard>
									</a>
								</Link>
							)}
						</>
					)}
				</section>

				<Footer />
			</main>
		</>
	);
};

export default CartPage;
