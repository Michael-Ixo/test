import { useState, useEffect } from 'react';

type WindowDimensions = {
	width: number | null;
	height: number | null;
};

const getWindowDimensions = (): WindowDimensions => {
	const { innerWidth, innerHeight } = window;

	return {
		width: innerWidth,
		height: innerHeight,
	};
};

const useWindowDimensions = (): WindowDimensions => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({ width: null, height: null });

	const handleResize = () => {
		setWindowDimensions(getWindowDimensions());
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
