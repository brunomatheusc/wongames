import { screen } from '@testing-library/react';
import '../../../.jest/match-media-mock';

import GameCardSlider from '.';
import { renderWithTheme } from 'utils/test/helpers';

describe('<GameCardSlider />', () => {
	it('should render the GameCardSlider', () => {
		renderWithTheme(<GameCardSlider items={[]} />);

		expect(screen.getByRole('heading', { name: /GameCardSlider/i })).toBeInTheDocument();
	});
});