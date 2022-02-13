import { render, screen } from '@testing-library/react';

import cardsMock from 'components/PaymentOptions/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Cart, { CartProps } from '.';
import { renderWithTheme } from 'utils/test/helpers';
import { ReactNode } from 'react';

const props: CartProps = {
	cards: cardsMock,
	recommendedGames: gamesMock,
	recommendedHighlight: highlightMock,
}

jest.mock('templates/Base', () => ({
	__esModule: true,
	default: function Mock({ children }: { children: ReactNode }) {
		return <div data-testid="Mock Base">{ children }</div>
	}
}));

jest.mock('components/Showcase', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Showcase" />
	}
}));

jest.mock('components/CartList', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Cart" />
	}
}));

jest.mock('components/PaymentOptions', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock PaymentOptions" />
	}
}));

jest.mock('components/Empty', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Empty" />
	}
}));

describe('<Cart />', () => {
	it('should render the Cart', () => {
		renderWithTheme(<Cart {...props} />);

		expect(screen.getByRole('heading', { name: /my cart/i }));

		expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();
		expect(screen.getByTestId('Mock Cart')).toBeInTheDocument();
		expect(screen.getByTestId('Mock PaymentOptions')).toBeInTheDocument();
		expect(screen.queryByTestId('Mock PaymentOptions')).not.toBeInTheDocument();
	});
});