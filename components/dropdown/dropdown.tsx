import { FC, useState } from 'react';
import cls from 'classnames';
import Select, { components } from 'react-select';

import styles from './dropdown.module.scss';
import ImageWithFallback from '@components/image-fallback/image-fallback';
import { getCSSVariable } from '@utils/styles';
import ArrowDown from '@icons/arrow-down.svg';

type DropdownProps = {
	tokens?: boolean;
} & React.ComponentProps<typeof Select>;

const cardBorderRadius = getCSSVariable('--card-border-radius');
const cardBGColor = getCSSVariable('--card-bg-color');
const accentColor = getCSSVariable('--accent-color');

const Dropdown: FC<DropdownProps> = ({ defaultValue, className, options, onChange, tokens = false, ...other }) => {
	const customStyles = {
		option: (provided: any, state: any) => ({
			...provided,
			backgroundColor: state.isSelected ? accentColor : cardBGColor,
		}),
		control: (base: any, state: any) => ({
			...base,
			border: 'none',
			background: cardBGColor,
			borderRadius: cardBorderRadius,
			minHeight: '60px',
		}),
		menu: (base: any) => ({
			...base,
			borderRadius: cardBorderRadius,
			background: cardBGColor,
			marginTop: 0,
			marginBottom: '70px',
		}),
		menuList: (base: any) => ({
			...base,
			borderRadius: cardBorderRadius,
			background: cardBGColor,
			padding: '0 10px 0 0',
		}),
	};

	return (
		<Select
			defaultValue={defaultValue}
			onChange={onChange}
			options={options}
			className={cls(styles.dropdown, className)}
			styles={customStyles}
			components={tokens ? { Option, SingleValue, DropdownIndicator } : undefined}
			{...other}
		/>
	);
};

export default Dropdown;

const Option = (props: any) => {
	return (
		<components.Option {...props}>
			<div className={styles.token}>
				<div className={styles.label}>
					<ImageWithFallback src={'/images/chain-logos/' + props.data.value + '.png'} fallbackSrc={'/images/chain-logos/fallback.png'} width={20} height={20} alt={props.data.label} />
					<p>{props.data.label}</p>
				</div>
				<div className={styles.value}>
					<p className={styles.amount}>{props.data.amount}</p>
					<p className={styles.price}>{props.data.price}</p>
				</div>
			</div>
		</components.Option>
	);
};

const SingleValue = (props: any) => {
	return (
		<components.SingleValue {...props}>
			<div className={styles.token}>
				<div className={styles.label}>
					<ImageWithFallback src={'/images/chain-logos/' + props.data.value + '.png'} fallbackSrc={'/images/chain-logos/fallback.png'} width={20} height={20} alt={props.data.label} />
					<p>{props.data.label}</p>
				</div>
				<div className={styles.value}>
					<p className={styles.amount}>{props.data.amount}</p>
					<p className={styles.price}>{props.data.price}</p>
				</div>
			</div>
		</components.SingleValue>
	);
};

const DropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<div className={styles.arrow}>
				<ArrowDown width={12} height={8} />
			</div>
		</components.DropdownIndicator>
	);
};
