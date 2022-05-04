import { ReactNode } from 'react';
import { render, screen } from 'utils/test-utils';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Cart, { CartProps } from '.';

const props: CartProps = {
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

jest.mock('components/PaymentForm', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock PaymentForm" />
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
		render(<Cart {...props} />);

		expect(screen.getByRole('heading', { name: /my cart/i }));

		expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();
		expect(screen.getByTestId('Mock Cart')).toBeInTheDocument();
		expect(screen.getByTestId('Mock PaymentForm')).toBeInTheDocument();
		expect(screen.queryByTestId('Mock PaymentForm')).not.toBeInTheDocument();
	});
});