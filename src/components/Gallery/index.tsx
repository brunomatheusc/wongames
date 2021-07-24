import { ArrowBackIos as ArrowLeft, ArrowForwardIos as ArrowRight, Close } from '@styled-icons/material-outlined';

import Slider, { SliderSettings } from 'components/Slider';
import { useEffect, useState } from 'react';
import * as S from './styles';

const settings: SliderSettings = {
	arrows: true,
	slidesToShow: 4,
	infinite: false,
	lazyLoad: 'ondemand',
	nextArrow: <ArrowRight aria-label="next image" />,
	prevArrow: <ArrowLeft aria-label="previous image" />,

	responsive: [
		{
			breakpoint: 1375,
			settings: {
				arrows: false,
				slidesToShow: 3.2,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 2.2,
			},
		},
		{
			breakpoint: 570,
			settings: {
				arrows: false,
				slidesToShow: 1.2,
			},
		},
		{
			breakpoint: 375,
			settings: {
				arrows: false,
				slidesToShow: 1.1,
			},
		},
	]
};

export type GalleryImageProps = {
	src: string;
	label: string;
}

export type GalleryProps = {
	items: GalleryImageProps[];
};

export default function Gallery({ items }: GalleryProps) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleKeyUp = ({ key}: KeyboardEvent) => key === 'Escape' && setIsOpen(false);

		window.addEventListener('keyup', handleKeyUp);

		return () => window.removeEventListener('keyup', handleKeyUp);
	}, [])

	return (
		<S.Wrapper>
            <Slider settings={settings}>
			{ items.map(({ src, label }, index) => (
				<img role="button" key={index} src={src} alt={`Thumb - ${label}`} onClick={() => setIsOpen(true)} />
			))}
			</Slider>

			<S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
				<S.Close role="button" aria-label="close modal" onClick={() => setIsOpen(false)}>
					<Close size={40} />
				</S.Close>
			</S.Modal>
		</S.Wrapper>
	);
};