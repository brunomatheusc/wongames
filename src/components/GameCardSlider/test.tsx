import '../../../.jest/session.mock';
import '../../../.jest/match-media-mock';

import { screen } from '@testing-library/react';

import items from './mock';

import GameCardSlider from '.';
import { renderWithTheme } from 'utils/test/helpers';

describe('<GameCardSlider />', () => {
	it('should render with 4 active items', () => {
		const { container } = renderWithTheme(<GameCardSlider items={items} />);
		expect(container.querySelectorAll('.slick-active')).toHaveLength(4);
	})

	it('should render white arrows if color passed', () => {
		renderWithTheme(<GameCardSlider items={items} color="white" />);

		expect(screen.getByLabelText(/previous games/i)).toHaveStyle({ color: '#FAFAFA' });
		expect(screen.getByLabelText(/next games/i)).toHaveStyle({ color: '#FAFAFA' });
	})
});