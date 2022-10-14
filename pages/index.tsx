import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/homePage.module.scss';
import Footer from '@components/footer/footer';
import { DetailsCard } from '@components/card/card';
import Stove from '@icons/stove.svg';
import Loader from '@components/loader/loader';
import { CartContext } from '@contexts/cart';
import cookstoveCard from '@images/cookstove-card.png';
import Image from 'next/image';
import Cart from '@components/cart/cart';

const Home: NextPage = () => {
	const { cart, updateCartItem } = useContext(CartContext);

	return (
		<>
			<Head>
				<title>Supamoto Purchase</title>
				<meta name="description" content="Supamoto Purchase dApp" />
			</Head>

			<main className={cls(utilsStyles.main)}>
				<h1 className={styles.title}>EMERGING COOKSTOVE IMPACT TOKENS</h1>

				<section className={utilsStyles.section}>
					<div className={cart.length > 0 ? utilsStyles.column : utilsStyles.columnCenter}>
						{cart.map(c => (
							<div className={styles.cookstoveImage}>
								<Image src={cookstoveCard} />
							</div>
						))}
						<DetailsCard Img={Stove} onClick={() => updateCartItem({ id: '1', price: 200 }, true)}>
							{cart.length > 0 ? 'add another stove token' : 'add a stove token to cart'}
						</DetailsCard>
					</div>

					<Cart />
				</section>

				<Footer />
			</main>
		</>
	);
};

export default Home;
