import { Container } from 'components/Container';
import BannerSlider from 'components/BannerSlider';
import Showcase from 'components/Showcase';
import Base from 'templates/Base';

import { BannerProps } from 'components/Banner';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';

import * as S from './styles';

export type HomeTemplateProps = {
	banners: BannerProps[];
	newGames: GameCardProps[];
	mostPopularHighlight: HighlightProps;
	mostPopularGames: GameCardProps[];
	upcomingGames: GameCardProps[];
	upcomingHighlight: HighlightProps;
	freeGames: GameCardProps[];
	freeHighlight: HighlightProps;
	newGamesTitle: string;
	mostPopularGamesTitle: string;
	upcomingGamesTitle: string;
	freeGamesTitle: string;
};

export default function Home({
	banners,
	newGames,
	mostPopularGames,
	mostPopularHighlight,
	upcomingGames,
	upcomingHighlight,
	freeGames,
	freeHighlight,
	newGamesTitle,
	mostPopularGamesTitle,
	upcomingGamesTitle,
	freeGamesTitle
}: HomeTemplateProps) {
	return (
		<Base>
			<Container>
				<S.SectionBanner>
					<BannerSlider items={banners} />
				</S.SectionBanner>
			</Container>

			<S.SectionNews>
				<Showcase title={newGamesTitle} games={newGames} color="black" />
			</S.SectionNews>

			<Showcase title={mostPopularGamesTitle} games={mostPopularGames} highlight={mostPopularHighlight} />

			<Showcase title={upcomingGamesTitle} games={upcomingGames} highlight={upcomingHighlight} />

			<Showcase title={freeGamesTitle} games={freeGames} highlight={freeHighlight} />
		</Base>
	);
};