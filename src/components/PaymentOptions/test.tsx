import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/test/helpers';

import PaymentOptions from '.';

import cards from './mock';

describe('<PaymentOptions />', () => {
	it('should render the PaymentOptions', () => {
		renderWithTheme(<PaymentOptions cards={cards} handlePayment={jest.fn} />);

		expect(screen.getByText(/4235/)).toBeInTheDocument();
		expect(screen.getByText(/4236/)).toBeInTheDocument();
		expect(screen.getByText(/add a new credit card/i)).toBeInTheDocument();
	});

	it('should handle select card when clicking on label', async () => {
		renderWithTheme(<PaymentOptions cards={cards} handlePayment={jest.fn} />);

		userEvent.click(screen.getByText(/4235/));

		await waitFor(	() => {
			expect(screen.getByRole('radio', { name: /4235/ })).toBeChecked();
		})
	});

	it('should not call handlePayment when button is disabled', async () => {
		const handlePayment = jest.fn();
		renderWithTheme(<PaymentOptions cards={cards} handlePayment={handlePayment} />);

		userEvent.click(screen.getByRole('button', { name: /buy now/i }));
		expect(handlePayment).not.toHaveBeenCalled();
	});

	it('should call handlePayment when credit card is selected', async () => {
		const handlePayment = jest.fn();
		renderWithTheme(<PaymentOptions cards={cards} handlePayment={handlePayment} />);

		userEvent.click(screen.getByText(/4235/));
		userEvent.click(screen.getByRole('button', { name: /buy now/i }));

		expect(handlePayment).not.toHaveBeenCalled();
	});
});