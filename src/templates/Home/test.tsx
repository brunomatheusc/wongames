import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';
import '../../../.jest/match-media-mock';

import Home from '.';

import bannersMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

const props = {
	banners: bannersMock,
	newGames: [gamesMock[0]],
	mostPopularHighlight: highlightMock,
	mostPopularGames: [gamesMock[0]],
	upcomingGames: [gamesMock[0]],
	upcomingHighlight: highlightMock,
	upcomingMoreGames: [gamesMock[0]],
	freeGames: [gamesMock[0]],
	freeHighlight: highlightMock,
};

jest.mock('components/Showcase', () => {
	return {
		__esModule: true,
		default: function Mock() {
			return <div data-testid="Mock Showcase"></div>
		}
	}
});

jest.mock('components/BannerSlider', () => {
	return {
		__esModule: true,
		default: function Mock() {
			return <div data-testid="Mock BannerSlider"></div>
		}
	}
});

describe('<Home />', () => {
	it('should render banner and showcases', () => {
 		renderWithTheme(<Home { ...props } />);

		expect(screen.getAllByTestId(/mock showcase/i)).toHaveLength(5);
		expect(screen.getByTestId(/mock BannerSlider/i)).toBeInTheDocument();
	});
});