// import Lottie from 'react-lottie-player';
import LottieLight from 'react-lottie-player/dist/LottiePlayerLight';

import loader from '@lotties/loader.json';

type LoaderProps = {
	size: string;
};

const Loader = ({ size }: LoaderProps) => {
	return <LottieLight play={true} loop={true} animationData={loader} speed={1} style={{ height: size, width: size }}></LottieLight>;
};

export default Loader;
