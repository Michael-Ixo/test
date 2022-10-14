import type { AppProps } from 'next/app';

import '@styles/globals.scss';
import '@styles/variables.scss';
import { CartProvider } from '@contexts/cart';
import { WalletProvider } from '@contexts/wallet';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<WalletProvider>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</WalletProvider>
	);
}

export default MyApp;
