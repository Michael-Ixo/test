import { HTMLAttributes, useContext, useState } from 'react';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from './crypto-purchase.module.scss';
import Card, { ButtonCard } from '@components/card/card';
import Image from 'next/image';
import IxoLogo from '@images/ixo.png';
import Dropdown from '@components/dropdown/dropdown';
import { ArrayElement } from 'types/general';
import IconText from '@components/icon-text/icon-text';
import Fail from '@icons/fail.svg';
import { CartContext } from '@contexts/cart';
import { cartTotal } from '@utils/cart';

type CryptoPurchaseProps = {} & HTMLAttributes<HTMLDivElement>;

const CryptoPurchase = ({ className, ...other }: CryptoPurchaseProps) => {
	const { cart } = useContext(CartContext);
	const [token, setToken] = useState<TokenOptionType | null>(null);
	const insufficientFunds = (token?.price ?? 0) < cartTotal(cart);

	return (
		<div className={cls(styles.container, className)} {...other}>
			<div className={utilsStyles.column}>
				<Card className={styles.addressCard}>
					<Image src={IxoLogo} width={32} height={32} alt="ixo logo" />
					<p>wallet</p>
				</Card>
				<p className={styles.text}>I want to pay with</p>
				<Dropdown tokens={true} defaultValue={token} onChange={option => setToken(option as TokenOptionType)} options={TokenOptions} placeholder={<p>Select token</p>} name="token" />
				{token && insufficientFunds ? (
					<div className={utilsStyles.columnCenter}>
						<IconText Img={Fail} text="Insuficcient wallet balance." />
					</div>
				) : null}
			</div>

			{token ? (
				<ButtonCard disabled={insufficientFunds} onClick={!insufficientFunds ? () => console.log('TO DO') : undefined}>
					CONTINUE
				</ButtonCard>
			) : null}
		</div>
	);
};

export default CryptoPurchase;

export const TokenOptions = [
	{ value: 'ixo', label: 'IXO', amount: 2500, price: 400.2 },
	{ value: 'atom', label: 'ATOM', amount: 1000, price: 320.2 },
	{ value: 'osmo', label: 'OSMO', amount: 100, price: 650.2 },
	{ value: 'xusd', label: 'XUSD', amount: 400.2, price: 120.2 },
];
export type TokenOptionType = ArrayElement<typeof TokenOptions>;
