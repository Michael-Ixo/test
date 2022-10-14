import { ChainInfo, AppCurrency } from '@keplr-wallet/types';

export interface ChainInfoWithExplorer extends ChainInfo {
	/** Formed as "https://explorer.com/{txHash}" */
	explorerUrlToTx: string;
	/** Add optional stable coin peg info to currencies. */
	currencies: Array<
		AppCurrency & {
			pegMechanism?: 'collateralized' | 'algorithmic' | 'hybrid';
		}
	>;
}

/** All currency attributes (stake and fee) are defined once in the `currencies` list.
 *  Maintains the option to skip this conversion and keep the verbose `ChainInfo` type.
 */
export type SimplifiedChainInfo = Omit<ChainInfoWithExplorer, 'stakeCurrency' | 'feeCurrencies'> & {
	currencies: Array<
		AppCurrency &
			PeggedCurrency & {
				isStakeCurrency?: boolean;
				isFeeCurrency?: boolean;
			}
	>;
};

export type PeggedCurrency = AppCurrency & {
	originCurrency?: AppCurrency & {
		/** For assets that are pegged/stablecoins. */
		pegMechanism?: 'algorithmic' | 'collateralized' | 'hybrid';
	};
};
