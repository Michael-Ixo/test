import { createContext, useState, HTMLAttributes, useEffect } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { KeplrWalletConnectV1 } from '@keplr-wallet/wc-client';
import { BroadcastMode, StdTx } from '@cosmjs/launchpad';
import axios from 'axios';

import { WALLET } from 'types/wallet';
import { timeout } from '@utils/general';
import { ChainInfos } from '@utils/chains';

export const WalletContext = createContext({ wallet: {} as WALLET, updateWallet: (newWallet: WALLET, override?: boolean) => {}, createSession: () => {} });

const createNewWallet = () => {
	return new WalletConnect({
		bridge: 'https://bridge.walletconnect.org',
		qrcodeModal: QRCodeModal,
		clientMeta: {
			name: 'Ixo',
			description: 'Ixo would like to connect',
			url: 'https://ixo.world',
			icons: ['https://gblobscdn.gitbook.com/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media'],
		},
	});
};

export const WalletProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
	let connector = createNewWallet();
	let keplrWC;

	const [wallet, setWallet] = useState<WALLET>({});

	useEffect(() => {
		console.log(wallet);
	}, [wallet]);

	const updateWallet = (newWallet: {}, override: boolean = false) => {
		if (override) setWallet(newWallet);
		else setWallet(currentWallet => ({ ...currentWallet, ...newWallet }));
	};

	const createSession = async () => {
		if (connector.connected) {
			connector.killSession();
			await timeout(100);
		}
		connector = createNewWallet();
		console.log('createSession !!!!!!');
		if (!connector.connected) {
			console.log('createSession create !!!!!!');
			connector.createSession();
		}
	};

	// useEffect(() => {
	// 	console.log('ran new collector effect');
	// 	connector.on('connect', (error, payload) => {
	// 		console.log('connect !!!!!');
	// 		keplrWC = new KeplrWalletConnectV1(connector, {
	// 			sendTx: sendTxWC,
	// 		});
	// 		if (error) console.error(error);
	// 		const { accounts, chainId } = payload.params[0];
	// 		updateWallet({ accounts, chainId });
	// 	});

	// 	connector.on('session_update', (error, payload) => {
	// 		console.log('session_update !!!!!!');
	// 		if (error) console.error(error);
	// 		const { accounts, chainId } = payload.params[0];
	// 		updateWallet({ accounts, chainId });
	// 	});

	// 	connector.on('disconnect', (error, payload) => {
	// 		console.log('disconnect !!!!!!');
	// 		if (error) console.error(error);
	// 		connector.killSession();
	// 	});
	// }, [connector]);
	// connector.on('connect', (error, payload) => {
	// 	console.log('connect !!!!!');
	// 	keplrWC = new KeplrWalletConnectV1(connector, {
	// 		sendTx: sendTxWC,
	// 	});
	// 	if (error) console.error(error);
	// 	const { accounts, chainId } = payload.params[0];
	// 	updateWallet({ accounts, chainId });
	// });

	// connector.on('session_update', (error, payload) => {
	// 	console.log('session_update !!!!!!');
	// 	if (error) console.error(error);
	// 	const { accounts, chainId } = payload.params[0];
	// 	updateWallet({ accounts, chainId });
	// });

	// connector.on('disconnect', (error, payload) => {
	// 	console.log('disconnect !!!!!!');
	// 	if (error) console.error(error);
	// 	connector.killSession();
	// });

	const value = { wallet, updateWallet, createSession };
	return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export async function sendTxWC(chainId: string, tx: StdTx | Uint8Array, mode: BroadcastMode): Promise<Uint8Array> {
	const restInstance = axios.create({
		baseURL: ChainInfos.find(chainInfo => chainInfo.chainId === chainId)!.rest,
	});

	const isProtoTx = Buffer.isBuffer(tx) || tx instanceof Uint8Array;

	const params = isProtoTx
		? {
				tx_bytes: Buffer.from(tx as any).toString('base64'),
				mode: (() => {
					switch (mode) {
						case 'async':
							return 'BROADCAST_MODE_ASYNC';
						case 'block':
							return 'BROADCAST_MODE_BLOCK';
						case 'sync':
							return 'BROADCAST_MODE_SYNC';
						default:
							return 'BROADCAST_MODE_UNSPECIFIED';
					}
				})(),
		  }
		: {
				tx,
				mode: mode,
		  };

	const result = await restInstance.post(isProtoTx ? '/cosmos/tx/v1beta1/txs' : '/txs', params);

	const txResponse = isProtoTx ? result.data['tx_response'] : result.data;

	if (txResponse.code != null && txResponse.code !== 0) {
		throw new Error(txResponse['raw_log']);
	}

	return Buffer.from(txResponse.txhash, 'hex');
}