import { render, screen } from '@testing-library/react';

import Wishlist from '.';

describe('<Wishlist />', () => {
	it('should render the Wishlist', () => {
		const { container } = render(<Wishlist />);

		expect(screen.getByRole('heading', { name: /Wishlist/i })).toBeInTheDocument();
	});
});