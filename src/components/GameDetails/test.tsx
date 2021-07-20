import { render, screen } from '@testing-library/react';

import GameDetails from '.';

describe('<GameDetails />', () => {
	it('should render the GameDetails', () => {
		const { container } = render(<GameDetails />);

		expect(screen.getByRole('heading', { name: /GameDetails/i })).toBeInTheDocument();
	});
});