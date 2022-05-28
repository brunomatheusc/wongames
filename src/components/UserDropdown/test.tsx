import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/test/helpers';

import UserDropdown from '.';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();

useRouter.mockImplementation(() => ({
	push,
}));

describe('<UserDropdown />', () => {
	it('should render username', () => {
		const username = "Bruno";
		renderWithTheme(<UserDropdown username={username} />);

		expect(screen.getByText(username)).toBeInTheDocument();
	});

	it('should render menu', () => {
		const username = "Bruno";
		renderWithTheme(<UserDropdown username={username} />);

		userEvent.click(screen.getByText(username));

		expect(screen.getByRole('link', { name: /my profile/i})).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /wishlist/i})).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /sign out/i})).toBeInTheDocument();
	});
});