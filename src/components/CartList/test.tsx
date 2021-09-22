import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import CartList from '.';

import mockItems from './mock';

describe('<CartList />', () => {
	it('should render the CartList', () => {
		const total = "R$ 314,00";
		renderWithTheme(<CartList items={mockItems} total={total} />);

		expect(screen.getAllByRole('heading')).toHaveLength(mockItems.length);
		expect(screen.getByText(total)).toHaveStyle({ color: '#F231A5' });
	});

	it('should render the CartList', () => {
		const total = "R$ 314,00";
		renderWithTheme(<CartList items={mockItems} total={total} hasButton />);

		expect(screen.getByText(/buy it now/i)).toBeInTheDocument();
	});

	it('should render empty if there are no games', () => {
		renderWithTheme(<CartList />);

		expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
		expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
	});
});