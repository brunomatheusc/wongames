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
});