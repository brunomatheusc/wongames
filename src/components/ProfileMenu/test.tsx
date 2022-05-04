import { screen } from '@testing-library/react';
import theme from 'styles/theme';
import { renderWithTheme } from 'utils/test/helpers';

import ProfileMenu from '.';

describe('<ProfileMenu />', () => {
	it('should render the ProfileMenu', () => {
		renderWithTheme(<ProfileMenu />);

		expect(screen.getByRole('link', { name: /my profile/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /my orders/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
	});

	it ('should render menu with an active link', () => {
		renderWithTheme(<ProfileMenu activeLink="/profile/orders" />);

		expect(screen.getByRole('link', { name: /my orders/i })).toHaveStyle({ background: theme.colors.primary, color: theme.colors.white });
	});
});