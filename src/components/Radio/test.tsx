import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import theme from 'styles/theme';
import { renderWithTheme } from 'utils/test/helpers';

import Radio from '.';

describe('<Radio />', () => {
	it('should render with label (White)', () => {
		renderWithTheme(<Radio label="Radio" labelFor="check" value="anyValue" />);

		const label = screen.getByText('Radio');

		expect(label).toBeInTheDocument();
		expect(label).toHaveStyle({ color: theme.colors.white });
	});

	it('should render with label (black)', () => {
		renderWithTheme(<Radio label="Radio" labelFor="check" labelColor="black" value="anyValue" />);

		const label = screen.getByText('Radio');

		expect(label).toBeInTheDocument();
		expect(label).toHaveStyle({ color: theme.colors.black });
	});

	it('should render without label', () => {
		renderWithTheme(<Radio />);

		const label = screen.queryByLabelText('Radio');

		expect(label).not.toBeInTheDocument();
	});

	it('should dispatch onCheck when label status changes', async () => {
		const onCheck = jest.fn();

		renderWithTheme(<Radio label="Radio" labelFor="Radio" onCheck={onCheck} value="anyValue" />);
		expect(onCheck).not.toHaveBeenCalled();

		const label = screen.getByLabelText('Radio');
		userEvent.click(label);

		await waitFor(() => { expect(onCheck).toHaveBeenCalledTimes(1) });
		expect(onCheck).toHaveBeenCalledWith('anyValue');
	});

	it('should be accessible with tab', async () => {
		renderWithTheme(<Radio label="Radio" labelFor="Radio" />);

		const radio = screen.getByLabelText('Radio');
		expect(document.body).toHaveFocus();

		userEvent.tab();
		expect(radio).toHaveFocus();
	});
});