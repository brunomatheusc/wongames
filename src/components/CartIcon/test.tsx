import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import CartIcon from '.';

describe('<CartIcon />', () => {
	it('should render without badge', () => {
		renderWithTheme(<CartIcon />);

		expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
		expect(screen.queryByLabelText(/cart items/)).not.toBeInTheDocument();
	});

	it('should render with badge', () => {
		renderWithTheme(<CartIcon quantity={3} />);

		expect(screen.queryByLabelText(/cart items/)).toBeInTheDocument();
		expect(screen.getByText(/3/)).toBeInTheDocument();
	});

	it('should render only with positive number', () => {
		renderWithTheme(<CartIcon quantity={-3} />);

		expect(screen.queryByLabelText(/cart items/)).not.toBeInTheDocument();
		expect(screen.queryByText(/-3/)).not.toBeInTheDocument();
	});
});