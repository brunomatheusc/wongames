import { render, screen } from '@testing-library/react';

import GameCardSlider from '.';

describe('<GameCardSlider />', () => {
	it('should render the GameCardSlider', () => {
		const { container } = render(<GameCardSlider items={[]} />);

		expect(screen.getByRole('heading', { name: /GameCardSlider/i })).toBeInTheDocument();
	});
});