import { NextSeo } from 'next-seo';

import Base from 'templates/Base';

import { Divider } from 'components/Divider';
import Gallery, { GalleryImageProps } from 'components/Gallery';
import { GameCardProps } from 'components/GameCard';
import GameDetails, { GameDetailsProps } from 'components/GameDetails';
import GameInfo, { GameInfoProps } from 'components/GameInfo';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';
import TextContent from 'components/TextContent';

import * as S from './styles';

export type GameTemplateProps = {
	slug?: string;
	cover: string;
	gameInfo: GameInfoProps;
	gallery?: GalleryImageProps[];
	description: string;
	details: GameDetailsProps;
	upcomingGames: GameCardProps[];
	upcomingHighlight: HighlightProps;
	recommendedGames: GameCardProps[];
};

export default function Game({ slug, cover, gameInfo, gallery, description, details, upcomingGames, upcomingHighlight, recommendedGames }: GameTemplateProps) {
	console.log({ upcomingGames });

	return (
		<Base>
			<NextSeo
				title={`${gameInfo.title} - Won Games`}
				description={gameInfo.description}
				canonical={`https://wongames.willianjusten.com.br/game/${slug}`}
				openGraph={{
					url: `https://wongames.willianjusten.com.br/game/${slug}`,
					title: `${gameInfo.title} - Won Games`,
					description: gameInfo.description,
					images: [
						{
							url: cover,
							alt: gameInfo.title
						}
					]
				}}
			/>

            <S.Cover src={cover} role="image" aria-label="cover" />

			<S.Main>
				<S.SectionGameInfo>
					<GameInfo {...gameInfo} />
				</S.SectionGameInfo>

				<S.SectionGallery>
					{ gallery && <Gallery items={gallery} />}
				</S.SectionGallery>

				<S.SectionDescription>
					<TextContent title="Description" content={description} />
				</S.SectionDescription>

				<S.SectionGameDetails>
					<GameDetails {...details} />

					<Divider />
				</S.SectionGameDetails>

				<Showcase title="Upcoming Games" games={upcomingGames} highlight={upcomingHighlight} />

				<Showcase title="You may like these games" games={recommendedGames} />
			</S.Main>
		</Base>
	);
};