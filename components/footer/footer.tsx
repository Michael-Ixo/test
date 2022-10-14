import styles from './footer.module.scss';
import Logo from '@icons/logo.svg';

type FooterProps = {
	showLinks?: boolean;
};

const Footer = ({ showLinks = true }: FooterProps) => {
	return (
		<footer className={styles.footer}>
			{showLinks ? <p>T&Cs</p> : null}
			<a href="https://emerging.se/" target="_blank" rel="noopener noreferrer">
				<Logo width={60} height={40} color="white" />
			</a>
			{showLinks ? <p>FAQ</p> : null}
		</footer>
	);
};

export default Footer;
