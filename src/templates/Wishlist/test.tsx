import '../../../.jest/session.mock';
import '../../../.jest/match-media-mock';
import { render, screen } from 'utils/test-utils';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

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
		render(<Wishlist {...props} />);

		expect(screen.getByRole('heading', { name: /wishlist/i })).toBeInTheDocument();
		expect(screen.getAllByText(/population zero/i)).toHaveLength(7);
		expect(screen.getByTestId("Mock Showcase")).toBeInTheDocument();
	});

	it('should render empty when there are no games', () => {
		render(<Wishlist recommendedGames={gamesMock} recommendedHighlight={highlightMock} />);

		expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /your wishlist is empty/i })).toBeInTheDocument();
	});
});