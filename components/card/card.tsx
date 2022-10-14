import { HTMLAttributes } from 'react';
import cls from 'classnames';

import styles from './card.module.scss';
import ArrowRight from '@icons/arrow-right.svg';

type CardProps = {} & HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, ...other }: CardProps) => {
	return (
		<div className={cls(styles.card, className)} {...other}>
			{children}
		</div>
	);
};

type DetailsCardProps = {
	Img: any;
	cardColorAccent?: boolean;
	imgColor?: string;
} & HTMLAttributes<HTMLDivElement>;

export const DetailsCard = ({ Img, imgColor = '#000', cardColorAccent = false, className, children, ...other }: DetailsCardProps) => {
	return (
		<Card className={cls(styles.detailsCard, styles.detailsCardSmaller, className, { [styles.accentBgColor]: cardColorAccent, [styles.invertedTextColor]: cardColorAccent })} {...other}>
			<Img width={45} height={45} color={imgColor} className={cardColorAccent ? styles.invertedImgColor : null} />
			<div className={styles.textContainer}>{children ? <p className={styles.text}>{children}</p> : null}</div>
		</Card>
	);
};

type ButtonCardProps = {
	Img?: any;
	disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const ButtonCard = ({ Img = ArrowRight, disabled = false, className, children, ...other }: ButtonCardProps) => {
	return (
		<Card className={cls(styles.detailsCard, styles.detailsCardSmaller, styles.buttonCard, styles.invertedTextColor, className, { [styles.accentBgColor]: !disabled })} {...other}>
			<Img width={45} height={45} className={styles.invertedImgColor} />
			<div className={styles.textContainer}>{children ? <p className={styles.text}>{children}</p> : null}</div>
		</Card>
	);
};

export default Card;
