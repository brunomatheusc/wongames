import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { initializeApollo } from 'utils/apollo';

import Game, { GameTemplateProps } from 'templates/Game';

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games';
import { QueryGameBySlug, QueryGameBySlugVariables } from 'graphql/generated/QueryGameBySlug';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { QueryUpcoming, QueryUpcomingVariables } from 'graphql/generated/QueryUpcoming';
import { QUERY_UPCOMING } from 'graphql/queries/upcoming';

import { gamesMapper, highlightMapper } from 'utils/mappers';
import { getImageUrl } from 'utils/getImageUrl';

const apolloClient = initializeApollo();

export default function Index(props: GameTemplateProps) {
	const router = useRouter();

	// Se a rota não tiver sido gerada ainda mostra um loading ou esqueleto
	if (router.isFallback)
		return null;

	return <Game {...props} />;
}

export async function getStaticPaths() {
	const { data: { games } } = await apolloClient.query<QueryGames, QueryGamesVariables>({query: QUERY_GAMES, variables: { limit: 9 }});

	const paths = games.map(({ slug }) => ({ params: { slug }}));

	return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data } = await apolloClient.query<QueryGameBySlug, QueryGameBySlugVariables>({
		query: QUERY_GAME_BY_SLUG,
		variables: { slug: `${params?.slug}` },
		fetchPolicy: "no-cache"
	});

	if (!data.games.length) {
		return { notFound: true };
	}

	const game = data.games[0];

	const { data: { recommended }} = await apolloClient.query<QueryRecommended>({ query: QUERY_RECOMMENDED });

	const TODAY = new Date().toISOString().slice(0, 10);
	const { data: { upcomingGames, showcase }} = await apolloClient.query<QueryUpcoming, QueryUpcomingVariables>({
		query: QUERY_UPCOMING,
		variables: { release_date: TODAY },
	});

	return {
		revalidate: 60,
		props: {
			slug: params?.slug,
			cover: `${getImageUrl(game.cover?.src)}`,
			gameInfo: {
				id: game.id,
				title: game.name,
				price: game.price,
				description: game.short_description,
			},
			gallery: game.gallery.map((image) => ({
				src: `${getImageUrl(image.src)}`,
				label: image.label,
			})),
			description: game.description,
			details: {
				developr: game.developers[0].name,
				releaseDate: game.release_date,
				platforms: game.platforms.map((platform) => platform.name),
				publisher: game.publisher?.name || '',
				rating: game.rating,
				genres: game.categories.map((category) => category.name),
			},
			upcommingGames: gamesMapper(upcomingGames),
			upcommingHighlight: highlightMapper(showcase?.upcomingGames?.highlight),
			recommendedGames: gamesMapper(recommended?.section?.games),
		}
	};
}
