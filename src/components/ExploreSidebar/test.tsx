import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import mockItems from './mock';

import ExploreSidebar from '.';
import userEvent from '@testing-library/user-event';

describe('<ExploreSidebar />', () => {
	it('should render headings', () => {
		renderWithTheme(<ExploreSidebar items={mockItems} onFilter={jest.fn} />);

		expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /sort by/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /system/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument();
	});

	it('should render inputs', () => {
		renderWithTheme(<ExploreSidebar items={mockItems} onFilter={jest.fn} />);

		expect(screen.getByRole('checkbox', { name: /under \$50/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /low to high/i })).toBeInTheDocument();
	});

	it('should render the filter button', () => {
		renderWithTheme(<ExploreSidebar items={mockItems} onFilter={jest.fn} />);

		expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
	});

	it('should check initial values that are passed', () => {
		renderWithTheme(<ExploreSidebar items={mockItems} onFilter={jest.fn} initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }} />);

		expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked();
		expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked();
	});

	it('should filter with initial values', () => {
		const onFilter = jest.fn();
		renderWithTheme(<ExploreSidebar items={mockItems} initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }} onFilter={onFilter} />);

		userEvent.click(screen.getByRole('button', { name: /filter/i }));

		expect(onFilter).toBeCalledWith({ platforms: ['windows'], sort_by: 'low-to-high' });
	});

	it('should filter with checked values', () => {
		const onFilter = jest.fn();
		renderWithTheme(<ExploreSidebar items={mockItems} onFilter={onFilter} />);

		userEvent.click(screen.getByLabelText(/windows/i));
		userEvent.click(screen.getByLabelText(/linux/i));
		userEvent.click(screen.getByLabelText(/low to high/i));

		expect(onFilter).toHaveBeenCalledTimes(4);

		userEvent.click(screen.getByRole('button', { name: /filter/i }));

		expect(onFilter).toBeCalledWith({ platforms: ['windows'], sort_by: 'low-to-high' });
	});

	it('should alternate between radio options', () => {
		const onFilter = jest.fn();
		renderWithTheme(<ExploreSidebar items={mockItems} onFilter={onFilter} />);

		userEvent.click(screen.getByLabelText(/low to high/i));
		userEvent.click(screen.getByLabelText(/high to low/i));

		userEvent.click(screen.getByRole('button', { name: /filter/i }));

		expect(onFilter).toBeCalledWith({ sort_by: 'high-to-low' });
	});
});