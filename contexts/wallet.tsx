import { createContext, useState, HTMLAttributes, useEffect } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { KeplrWalletConnectV1 } from '@keplr-wallet/wc-client';
import { BroadcastMode, StdTx } from '@cosmjs/launchpad';
import axios from 'axios';
import { fromBase64 } from '@cosmjs/encoding';

import { WALLET } from 'types/wallet';
import { timeout } from '@utils/general';
import { ChainInfos } from '@utils/chains';

export const WalletContext = createContext({ wallet: {} as WALLET, updateWallet: (newWallet: WALLET, override?: boolean) => {}, createSession: () => {} });

const createNewWallet = () => {
	const wc = new WalletConnect({
		bridge: 'https://bridge.walletconnect.org',
		qrcodeModal: QRCodeModal,
		signingMethods: ['keplr_enable_wallet_connect_v1', 'keplr_sign_amino_wallet_connect_v1'],
	});
	// console.log({ wc });

	// XXX: I don't know why they designed that the client meta options in the constructor should be always ingored...
	// @ts-ignore
	wc._clientMeta = {
		name: 'Ixo',
		description: 'Ixo would like to connect',
		url: 'https://ixo.world',
		icons: ['https://gblobscdn.gitbook.com/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media'],
	};
	return wc;
};

export const WalletProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
	let connector = createNewWallet();
	let keplrWC;

	const [wallet, setWallet] = useState<WALLET>({});

	useEffect(() => {
		console.log(wallet);
		if (connector.connected) {
			console.log('connected init');
			createEffects();
			createKeplWC();
		}
	}, []);

	const updateWallet = (newWallet: {}, override: boolean = false) => {
		if (override) setWallet(newWallet);
		else setWallet(currentWallet => ({ ...currentWallet, ...newWallet }));
	};

	const createSession = async () => {
		console.log('createSession');
		if (connector.connected) {
			console.log('connected');
			createEffects();
			createKeplWC();
			return;
			// connector.killSession();
			// await timeout(100);
		}
		connector = createNewWallet();
		if (!connector.connected) {
			console.log('createSession create');
			await connector.createSession();
			createEffects();
		}
	};

	const createKeplWC = async () => {
		keplrWC = new KeplrWalletConnectV1(connector, {
			sendTx: sendTxWC,
		});
		// keplrWC.signDirect();
		// keplrWC.experimentalSuggestChain(ChainInfos.find(chainInfo => chainInfo.chainId === 'pandora-5' || chainInfo.chainId === 'impacthub-3') as any);
		console.log(await keplrWC.getKey('impacthub-3'));
		// keplrWC.sendTx('impacthub-3', fromBase64('asdasdas'), BroadcastMode.Block);
	};

	const createEffects = () => {
		connector.on('connect', (error, payload) => {
			console.log('connect !!!!!');
			createKeplWC();
			if (error) throw error;
			const { accounts, chainId } = payload.params[0];
			updateWallet({ accounts, chainId });
		});

		connector.on('session_update', (error, payload) => {
			console.log('session_update !!!!!!');
			if (error) throw error;
			const { accounts, chainId } = payload.params[0];
			updateWallet({ accounts, chainId });
		});

		connector.on('disconnect', (error, payload) => {
			console.log('disconnect !!!!!!');
			if (error) throw error;
			try {
				connector.killSession();
			} catch (error) {
				console.error(error);
			}
		});
	};

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
