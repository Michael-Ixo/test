import Image from 'next/image';
import cls from 'classnames';
import ProgressBar from '@ramonak/react-progress-bar';

import styles from './cookstove.module.scss';
import { shimmerDataUrl } from '@utils/image';

type CookstoveProps = {};

const Cookstove = ({}: CookstoveProps) => {
	return (
		<div className={styles.cookstove}>
			<div className={styles.image}>
				<Image src="/images/cookstove1.png" alt="image" layout="fill" placeholder="blur" blurDataURL={shimmerDataUrl()} />
			</div>
			<div className={styles.body}>
				<div className={styles.tags}>
					<div className={styles.tag}>Inventory</div>
					<div className={cls(styles.tag, styles.orangeTag)}>Clean CookStove</div>
					<Image src="/images/supamoto-icon.png" width={32} height={32} />
				</div>

				<h3 className={styles.title}>SupaMoto</h3>
				<p className={styles.greyText}>Malawi Collection 2022</p>

				<div className={styles.progressBar}>
					<ProgressBar completed={13.2} maxCompleted={20} customLabel="" />
					<p>
						<strong>
							<span className={styles.blueText}>10.12</span> CARBON
						</strong>{' '}
						claimed ~ <strong>1,23K</strong> produced
					</p>
				</div>

				<div className={styles.number}>
					<p>
						<strong>250</strong>
					</p>
					<p>of 1,500</p>
				</div>

				<div className={styles.footer}>
					<p className={styles.greyText}>31/09/2022</p>
					<p>$250.00</p>
				</div>
			</div>
		</div>
	);
};

export default Cookstove;
