import { render, screen } from '@testing-library/react';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import { renderWithTheme } from 'utils/test/helpers';

import Wishlist, { WishlistTemplateProps } from '.';

const props: WishlistTemplateProps = {
	games: gamesMock,
	recommendedGames: gamesMock,
	recommendedHighlight: highlightMock,
};

jest.mock('components/Showcase', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Showcase" />
	}
}));

describe('<Wishlist />', () => {
	it('should render the Wishlist', () => {
		renderWithTheme(<Wishlist {...props} />);

		expect(screen.getByRole('heading', { name: /wishlist/i })).toBeInTheDocument();
		expect(screen.getAllByText(/population zero/i)).toHaveLength(7);
		expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
	});
});