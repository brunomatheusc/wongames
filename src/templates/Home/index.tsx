import { Container } from 'components/Container';

import Footer from 'components/Footer';
import Menu from 'components/Menu';
import BannerSlider from 'components/BannerSlider';

import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';

import { BannerProps } from 'components/Banner';
import { GameCardProps } from 'components/GameCard';

import * as S from './styles';

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

				<S.SectionBanner>
					<BannerSlider items={banners} />
				</S.SectionBanner>
			</Container>

			<S.SectionNews>
				<Showcase title="News" games={newGames} />
			</S.SectionNews>

			<Showcase title="Most Popular" games={mostPopularGames} highlight={mostPopularHighlight} />

			<S.SectionUpcoming>
				<Showcase title="Upcoming" games={upcomingGames} />

				<Showcase games={upcomingMoreGames} highlight={upcomingHighlight} />
			</S.SectionUpcoming>

			<Showcase title="Free games" games={freeGames} highlight={freeHighlight} />

			<S.SectionFooter>
				<Container>
					<Footer />
				</Container>
			</S.SectionFooter>
		</S.Wrapper>
	);
};