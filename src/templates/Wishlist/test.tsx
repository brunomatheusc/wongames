import '../../../.jest/session.mock';
import '../../../.jest/match-media-mock';
import { render, screen } from 'utils/test-utils';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Wishlist, { WishlistTemplateProps } from '.';
import { WishlistContextDefaultValues } from 'hooks/use-wishlist';

const props: WishlistTemplateProps = {
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
		const wishlistProviderProps = {
			...WishlistContextDefaultValues,
			items: [gamesMock[0]]
		}

		render(<Wishlist {...props} />, { wishlistProviderProps });

		expect(screen.getByRole('heading', { name: /wishlist/i })).toBeInTheDocument();
		expect(screen.getByText(/population zero/i)).toHaveLength(7);
		expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
	});

	it('should render empty when there are no games', () => {
		const wishlistProviderProps = {
			...WishlistContextDefaultValues,
			items: []
		}

		render(<Wishlist recommendedGames={gamesMock} recommendedHighlight={highlightMock} />, { wishlistProviderProps });

		expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /your wishlist is empty/i })).toBeInTheDocument();
	});
});