import { CartContextDefaultValues } from 'hooks/use-cart';
import { render, screen } from 'utils/test-utils';

import CartIcon from '.';

describe('<CartIcon />', () => {
	it('should render without badge', () => {
		render(<CartIcon />);

		expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
		expect(screen.queryByLabelText(/cart items/)).not.toBeInTheDocument();
	});

	it('should render with badge', () => {
		render(<CartIcon />, { cartProviderProps: { ...CartContextDefaultValues, quantity: 3 }});

		expect(screen.queryByLabelText(/cart items/)).toBeInTheDocument();
		expect(screen.getByText(/3/)).toBeInTheDocument();
	});

	it('should render only with positive number', () => {
		render(<CartIcon />);

		expect(screen.queryByLabelText(/cart items/)).not.toBeInTheDocument();
		expect(screen.queryByText(/-3/)).not.toBeInTheDocument();
	});
});