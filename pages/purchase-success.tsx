import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/homePage.module.scss';
import Footer from '@components/footer/footer';
import { DetailsCard } from '@components/card/card';
import Stove from '@icons/stove.svg';
import Ixo from '@icons/ixo.svg';
import Success from '@icons/success.svg';
import { CartContext } from '@contexts/cart';
import IconText from '@components/icon-text/icon-text';
import Link from 'next/link';

const PurchaseSuccessPage: NextPage = () => {
	const { cart } = useContext(CartContext);

	return (
		<>
			<Head>
				<title>Purchase Success</title>
				<meta name="description" content="Supamoto Purchase Success" />
			</Head>

			<main className={cls(utilsStyles.main)}>
				<h1 className={styles.title}>EMERGING COOKSTOVE IMPACT TOKENS</h1>

				<section className={utilsStyles.section}>
					<div className={utilsStyles.columnCenter}>
						<IconText Img={Success} imgSize={100} text="Purchase successful!" />
					</div>

					<DetailsCard Img={Ixo} imgColor="#fff" onClick={() => console.log('Need to add deeplink')}>
						view in Impact X Wallet
					</DetailsCard>
					<Link href="/">
						<a>
							<DetailsCard Img={Stove}>buy more</DetailsCard>
						</a>
					</Link>
				</section>

				<Footer />
			</main>
		</>
	);
};

export default PurchaseSuccessPage;
