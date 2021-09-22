import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import mockItems from 'components/CartList/mock';

import CartDropdown from '.';

describe('<CartDropdown />', () => {
	it('should render the <CartIcon /> and its badge', () => {
		const total = "R$ 300,00";
		renderWithTheme(<CartDropdown items={mockItems} total={total} />);

		expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
		expect(screen.getByText(`${mockItems.length}`)).toBeInTheDocument();
	});

	it('should render Dropdown content with cart items and total', () => {
		const total = "R$ 300,00";
		renderWithTheme(<CartDropdown items={mockItems} total={total} />);

		expect(screen.getByText(total)).toBeInTheDocument();
		expect(screen.getByText(`${mockItems[0].title}`)).toBeInTheDocument();
	});
});