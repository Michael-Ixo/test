import type { AppProps } from 'next/app';

import '@styles/globals.scss';
import '@styles/variables.scss';
import { CartProvider } from '@contexts/cart';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<CartProvider>
			<Component {...pageProps} />
		</CartProvider>
	);
}

export default MyApp;
