import { ArrowBackIos as ArrowLeft, ArrowForwardIos as ArrowRight, Close } from '@styled-icons/material-outlined';
import SlickSlider from 'react-slick';

import Slider, { SliderSettings } from 'components/Slider';
import { useEffect, useRef, useState } from 'react';

import * as S from './styles';

const commonSettings: SliderSettings = {
	infinite: false,
	lazyLoad: 'ondemand',
	arrows: true,
	nextArrow: <ArrowRight aria-label="next image" />,
	prevArrow: <ArrowLeft aria-label="previous image" />,
};

const settings: SliderSettings = {
	...commonSettings,
	slidesToShow: 4,

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

const modalSettings: SliderSettings = {
	...commonSettings,
	slidesToShow: 1,
};

export type GalleryImageProps = {
	src: string;
	label: string;
}

export type GalleryProps = {
	items: GalleryImageProps[];
};

export default function Gallery({ items }: GalleryProps) {
	const slider = useRef<SlickSlider>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleKeyUp = ({ key}: KeyboardEvent) => key === 'Escape' && setIsOpen(false);

		window.addEventListener('keyup', handleKeyUp);

		return () => window.removeEventListener('keyup', handleKeyUp);
	}, [])

	return (
		<S.Wrapper>
            <Slider ref={slider} settings={settings}>
			{ items.map(({ src, label }, index) => (
				<img role="button" key={`thumb-${index}`} src={src} alt={`Thumb - ${label}`} onClick={() => { setIsOpen(true); slider.current!.slickGoTo(index, true)}} />
			))}
			</Slider>

			<S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
				<S.Close role="button" aria-label="close modal" onClick={() => setIsOpen(false)}>
					<Close size={40} />
				</S.Close>

				<S.Content>
					<Slider ref={slider} settings={modalSettings}>
					{ items.map(({ src, label }, index) => (
						<img key={`gallery-${index}`} src={src} alt={label} />
					))}
					</Slider>
				</S.Content>
			</S.Modal>
		</S.Wrapper>
	);
};