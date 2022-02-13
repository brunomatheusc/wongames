import { CartContextDefaultValues } from 'hooks/use-cart';
import { render, screen } from 'utils/test-utils';

import CartList from '.';

import items from './mock';

describe('<CartList />', () => {
	it('should render the CartList', () => {
		const total = "R$ 314,00";
		const cartProviderProps = {
			...CartContextDefaultValues,
			items,
			total,
		};

		const { container } = render(<CartList />, { cartProviderProps });

		expect(screen.getAllByRole('heading')).toHaveLength(items.length);
		expect(screen.getByText(total)).toHaveStyle({ color: '#F231A5' });
	});

	it('should render button', () => {
		const total = "R$ 314,00";
		const cartProviderProps = {
			...CartContextDefaultValues,
			items,
			total,
		};
		render(<CartList hasButton />, { cartProviderProps });

		expect(screen.getByText(/buy it now/i)).toBeInTheDocument();
	});

	it('should render loading', () => {
		const cartProviderProps = {
			...CartContextDefaultValues,
			loading: true,
		};

		render(<CartList hasButton />, { cartProviderProps });

		expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
	});

	it('should render empty if there are no games', () => {
		render(<CartList />);

		expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
		expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
	});
});