import { screen } from '@testing-library/react';
import theme from 'styles/theme';
import { renderWithTheme } from 'utils/test/helpers';

import ProfileMenu from '.';

describe('<ProfileMenu />', () => {
	it('should render the ProfileMenu', () => {
		renderWithTheme(<ProfileMenu />);

		expect(screen.getByRole('link', { name: /my profile/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /my cards/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /my orders/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();
	});

	it ('should render menu with an active link', () => {
		renderWithTheme(<ProfileMenu activeLink="/profile/cards" />);

		expect(screen.getByRole('link', { name: /my profile/i })).toHaveStyle({ background: theme.colors.primary, color: theme.colors.white });
	});
});