import { Container } from 'components/Container';
import Footer from 'components/Footer';
import Heading from 'components/Heading';
import Menu from 'components/Menu';

import { BannerProps } from 'components/Banner';
import { GameCardProps } from 'components/GameCard';

import * as S from './styles';
import Highlight, { HighlightProps } from 'components/Highlight';
import BannerSlider from 'components/BannerSlider';
import GameCardSlider from 'components/GameCardSlider';

export type HomeTemplateProps = {
	banners: BannerProps[];
	newGames: GameCardProps[];
	mostPopularHighlight: HighlightProps;
	mostPopularGames: GameCardProps[];
	upcomingGames: GameCardProps[];
	upcomingHighlight: HighlightProps;
	upcomingMoreGames: GameCardProps[];
	freeGames: GameCardProps[];
	freeHighlight: HighlightProps;
};

export default function Home({ banners, newGames, mostPopularGames, mostPopularHighlight, upcomingGames, upcomingHighlight, upcomingMoreGames, freeGames, freeHighlight }: HomeTemplateProps) {
	return (
		<S.Wrapper>
			<Container>
	            <Menu />

				<BannerSlider items={banners} />
			</Container>

			<Container>
				<Heading color="black" lineLeft lineColor="secondary">News</Heading>

				<GameCardSlider items={newGames} color="black" />
			</Container>

			<Container>
				<Heading lineLeft lineColor="secondary">Most Popular</Heading>

				<Highlight { ...mostPopularHighlight } />
				<GameCardSlider items={mostPopularGames} />
			</Container>

			<Container>
				<Heading lineLeft lineColor="secondary">Upcoming</Heading>

				<GameCardSlider items={upcomingGames} />
				<Highlight { ...upcomingHighlight } />
				<GameCardSlider items={upcomingMoreGames} />
			</Container>

			<Container>
				<Heading lineLeft lineColor="secondary">Free Games</Heading>

				<Highlight { ...freeHighlight } />
				<GameCardSlider items={freeGames} />
			</Container>

			<Container>
				<Footer />
			</Container>
		</S.Wrapper>
	);
};