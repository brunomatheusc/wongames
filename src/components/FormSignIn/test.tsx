import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import FormSignIn from '.';

describe('<FormSignIn />', () => {
	it('should render the form', () => {
		renderWithTheme(<FormSignIn />);

		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Sign in now/i})).toBeInTheDocument();
	});

	it('should render the forgot password link', () => {
		renderWithTheme(<FormSignIn />);

		expect(screen.getByRole('link', { name: /Forgot your password\?/i }));
	});

	it('should render text to sign up if already have an account', () => {
		renderWithTheme(<FormSignIn />);

		expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
		expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
	});
});