import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import GameInfo from '.';

const props = {
	title: 'My game title',
	description: 'Game description',
	price: 210.00,
};

describe('<GameInfo />', () => {
	it('should render game informations', () => {
		renderWithTheme(<GameInfo {...props} />);

		const { title, price, description } = props;

		expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
		expect(screen.getByText(`$${price}`)).toBeInTheDocument();
		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it('should render buttons', () => {
		renderWithTheme(<GameInfo {...props} />);

		expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /wishlist/i })).toBeInTheDocument();
	});
});