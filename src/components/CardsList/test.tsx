import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import cardsMock from 'components/PaymentOptions/mock';

import CardsList from '.';

describe('<CardsList />', () => {
	it('should render the CardsList', () => {
		renderWithTheme(<CardsList cards={cardsMock} />);

		expect(screen.getByRole('heading', { name: /My cards/i })).toBeInTheDocument();
		expect(screen.getByRole('img', { name: /visa/i })).toHaveAttribute('src', '/img/cards/visa.png');
		expect(screen.getByText(/4235/i)).toBeInTheDocument();
	});
});