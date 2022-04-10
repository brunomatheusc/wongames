import 'server.mock';

import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/client';

import { render, screen } from 'utils/test-utils';

import FormResetPassword from '.';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();
let query = {};

useRouter.mockImplementation(() => ({
	push,
	query,
	asPath: '',
	route: '/'
}));

jest.mock('next-auth/client', () => ({
	signIn: jest.fn(),
}));

describe('<FormResetPassword />', () => {
	it('should render the form', () => {
		render(<FormResetPassword />);

		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Reset password/i})).toBeInTheDocument();
	});

	it('should show validation errors', async () => {
		render(<FormResetPassword />);

		await userEvent.type(screen.getByPlaceholderText(/password/i), '123');
		await userEvent.type(screen.getByPlaceholderText(/confirm password/i), '321');
		userEvent.click(screen.getByRole('button', { name: /Reset password/i}));

		expect(await screen.findByText(/confirm password does not match/i));
	});

	it('should show error when code provided is wrong', async () => {
		const code = 'wrong_code';
		query = { code };

		render(<FormResetPassword />);

		await userEvent.type(screen.getByPlaceholderText(/password/i), '123');
		await userEvent.type(screen.getByPlaceholderText(/confirm password/i), '123');
		userEvent.click(screen.getByRole('button', { name: /Reset password/i}));

		expect(await screen.findByText(/Incorrect code provided/i)).toBeInTheDocument();
	});

	it('should reset the password and sign in the user', async () => {
		const code = 'valid_code';
		query = { code };

		render(<FormResetPassword />);

		await userEvent.type(screen.getByPlaceholderText(/password/i), '123');
		await userEvent.type(screen.getByPlaceholderText(/confirm password/i), '123');
		userEvent.click(screen.getByRole('button', { name: /Reset password/i}));

		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith('credentials', {
				email: 'valid@email.com',
				password: '123',
				callbackUrl: '/'
			});
		});
	});
});