import { render, screen } from '@testing-library/react';
import { SliderSettings } from 'components/Slider';
import '../../../.jest/match-media-mock';

import BannerSlider from '.';
import { renderWithTheme } from 'utils/test/helpers';

const items = [
	{
		img: 'https://source.unsplash.com/user/willianjusten/1042x580',
		title: 'Defy death 1',
		subtitle: '<p>Play the new <strong>Crashlands</strong> season</p>',
		buttonLabel: 'Buy now',
		buttonLink: '/games/defy-death',
		ribbon: 'Bestselling',
	},
	{
		img: 'https://source.unsplash.com/user/willianjusten/1042x582',
		title: 'Defy death 2',
		subtitle: '<p>Play the new <strong>Crashlands</strong> season</p>',
		buttonLabel: 'Buy now',
		buttonLink: '/games/defy-death',
	},
];

const settings: SliderSettings = {
	dots: true,
	arrows: false,
	vertical: true,
	verticalSwiping: true,
	infinite: false,

	responsive: [
		{
			breakpoint: 1170,
			settings: {
				vertical: false,
				verticalSwiping: false,
			}
		}
	]
};

describe('<BannerSlider />', () => {
	it('should render the vertical slider', () => {
		const { container } = renderWithTheme(<BannerSlider items={items} />);

		expect(container.querySelector('.slick-vertical')).toBeInTheDocument();
	});

	it('should render with 1 active item', () => {
		const { container } = renderWithTheme(<BannerSlider items={items} />);

		expect(container.querySelectorAll('.slick-slide')).toHaveLength(2);
		expect(container.querySelector('.slick-active')).toBeInTheDocument();

		expect(screen.getByRole('heading', { name: /defy death 1/i, hidden: false })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /defy death 2/i, hidden: true })).toBeInTheDocument();
	});
});