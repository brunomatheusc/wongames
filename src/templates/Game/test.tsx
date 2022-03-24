import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import Game, { GameTemplateProps } from '.';

import galleryMock from 'components/Gallery/mock';
import gameInfoMock from 'components/GameInfo/mock';
import gameDetailsMock from 'components/GameDetails/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import textContentMock from 'components/TextContent/mock';

const props: GameTemplateProps = {
	cover: 'bg-image.jpg',
	gameInfo: gameInfoMock,
	gallery: galleryMock,
	// description: textContentMock.content,
	description: `<h1>Content</h1>`,
	details: gameDetailsMock,
	upcomingGames: gamesMock,
	upcomingHighlight: highlightMock,
	recommendedGames: gamesMock
}

jest.mock('components/Menu', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Menu" />
	}
}));

jest.mock('components/Gallery', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Gallery" />
	}
}));

jest.mock('components/GameInfo', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock GameInfo" />
	}
}));

jest.mock('components/GameDetails', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock GameDetails" />
	}
}));

jest.mock('components/Showcase', () => ({
	__esModule: true,
	default: function Mock() {
		return <div data-testid="Mock Showcase" />
	}
}));

jest.mock('templates/Base', () => ({
	__esModule: true,
	default: function Mock({ children }: { children: React.ReactNode}) {
		return <div data-testid="Mock Base">{ children }</div>
	}
}));

describe('<Game />', () => {
	it('should render template with components', () => {
		renderWithTheme(<Game {...props} />);

		expect(screen.getByTestId('Mock Gallery')).toBeInTheDocument();
		expect(screen.getByTestId('Mock GameInfo')).toBeInTheDocument();
		expect(screen.getByTestId('Mock GameDetails')).toBeInTheDocument();
		expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(2);
		expect(screen.getByText(/content/i)).toBeInTheDocument();
	});

	it('should render not render the gallery if there\'s no images', () => {
		renderWithTheme(<Game {...props} gallery={undefined} />);

		expect(screen.queryByTestId('Mock Gallery')).not.toBeInTheDocument();
	});

	it('should render not render the gallery on mobile', () => {
		renderWithTheme(<Game {...props} />);

		expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyle({ display: 'none' });
		expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyleRule('display', 'block', { media: '(min-width: 768px)'});
	});

	it('should render cover image', () => {
		renderWithTheme(<Game {...props} />);

		expect(screen.getByRole('image', { name: /cover/i })).toHaveStyle({ backgroundImage: 'url(bg-image.jpg)', height: '39.5rem' })
	});
});