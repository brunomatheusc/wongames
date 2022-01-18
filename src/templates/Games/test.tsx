import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';
import {MockedProvider} from '@apollo/client/testing';

import filterItemsMock from 'components/ExploreSidebar/mock';

import { fetchMoreMock, gamesMock } from './mock';
import Games from '.';
import userEvent from '@testing-library/user-event';
import apolloCache from 'utils/apolloCache';

jest.mock('templates/Base', () => ({
	__esModule: true,
	default: function Mock({ children }: { children: React.ReactNode }) {
		return <div data-testid="Mock Base">{children}</div>
	}
}));

jest.mock('templates/ExploreSidebar', () => ({
	__esModule: true,
	default: function Mock({ children }: { children: React.ReactNode }) {
		return <div data-testid="Mock ExploreSidebar">{children}</div>
	}
}));

jest.mock('templates/GameCard', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock GameCard" />
	}
}));

describe('<Games />', () => {
	it('should render loading when starting template', () => {
		renderWithTheme(
			<MockedProvider mocks={[]} addTypename={false}>
				<Games filterItems={filterItemsMock} />
			</MockedProvider>
		);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});

	it('should render sections', async () => {
		renderWithTheme(
			<MockedProvider mocks={[gamesMock]} cache={apolloCache}>
				<Games filterItems={filterItemsMock} />
			</MockedProvider>
		);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		expect(await screen.findByTestId('Mock ExploreSidebar')).toBeInTheDocument();
		expect(await screen.findByText(/Sample game/i)).toBeInTheDocument();
		expect(await screen.findByRole('button', { name: /show more/i })).toBeInTheDocument();
	});

	it('should render more games when show more is clicked', async () => {
		renderWithTheme(
			<MockedProvider mocks={[gamesMock, fetchMoreMock]} addTypename={false}>
				<Games filterItems={filterItemsMock} />
			</MockedProvider>
		);

		expect(await screen.findByText(/Sample game/i)).toBeInTheDocument();
		userEvent.click(await screen.findByRole('button', { name: /show more/i }));
		expect(await screen.findByText(/Fetch more game/i)).toBeInTheDocument();
	});
});