import { screen } from '@testing-library/react';
import mock from './mock';

import OrdersLists from '.';
import { ReactNode } from 'react';
import { renderWithTheme } from 'utils/test/helpers';

jest.mock('components/Empty', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testId="Mock Empty" />
	}
}))

jest.mock('components/GameItem', () => ({
	__esModule: true,
	default: function Mock({ children }: { children: ReactNode }) {
		return <div data-testId="Mock GameItem">{ children }</div>
	}
}))

describe('<OrdersLists />', () => {
	it('should render game items', () => {
		renderWithTheme(<OrdersLists items={mock} />);

		expect(screen.getByRole('heading', { name: /my orders/i })).toBeInTheDocument();
		expect(screen.getAllByTestId(/mock gameitem/i)).toHaveLength(2);
	});

	it('should render empty state', () => {
		renderWithTheme(<OrdersLists items={[]} />);

		expect(screen.getAllByTestId(/mock empty/i)).toBeInTheDocument();
	});
});