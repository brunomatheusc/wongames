import { Email } from '@styled-icons/material-outlined';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/test/helpers';

import TextField from '.';

describe('<TextField />', () => {
	it('should render with label', () => {
		renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />);

		expect(screen.getByLabelText('Label')).toBeInTheDocument();
	});

	it('should render with label', () => {
		renderWithTheme(<TextField />);

		expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
	});

	it('should render with placeholder', () => {
		renderWithTheme(<TextField placeholder="hey you" />);

		expect(screen.queryByPlaceholderText('hey you')).toBeInTheDocument();
	});

	it('should render with icon', () => {
		renderWithTheme(<TextField icon={<Email data-testid="icon" />} />);

		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('should render with icon on the right side', () => {
		renderWithTheme(<TextField icon={<Email data-testid="icon" />} iconPosition="right" />);

		expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 });
	});

	it('should change its value when typing', async () => {
		const onInput = jest.fn();

		renderWithTheme(<TextField onInput={onInput} label="TextField" labelFor="TextField" id="TextField" />);

		const input = screen.getByRole('textbox');
		const text = 'This is my new text';
		userEvent.type(input, text);

		await waitFor(() => {
			expect(input).toHaveValue(text);
			expect(onInput).toHaveBeenCalledTimes(text.length);
		})

		expect(onInput).toHaveBeenCalledWith(text);
	});

	it('should not change its value when disabled', async () => {
		const onInput = jest.fn();

		renderWithTheme(<TextField onInput={onInput} label="TextField" labelFor="TextField" id="TextField" disabled />);

		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();

		const text = 'This is my new text';
		userEvent.type(input, text);

		await waitFor(() => {
			expect(input).not.toHaveValue(text);
		});

		expect(input).not.toHaveBeenCalled();
	});

	it('should be accessible by tab', () => {
		renderWithTheme(<TextField label="TextField" labelFor="TextField" id="TextField" />);

		const input = screen.getByLabelText('TextField');
		expect(document.body).toHaveFocus();

		userEvent.tab();
		expect(input).toHaveFocus();
	});
});