import { useRouter } from 'next/router';
import { initializeApollo } from 'utils/apollo';

import Game, { GameTemplateProps } from 'templates/Game';

import galleryMock from 'components/Gallery/mock';
import gameDetailsMock from 'components/GameDetails/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games';
import { QueryGameBySlug, QueryGameBySlugVariables } from 'graphql/generated/QueryGameBySlug';
import { GetStaticProps } from 'next';

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
	const { data } = await apolloClient.query<QueryGameBySlug, QueryGameBySlugVariables>({ query: QUERY_GAME_BY_SLUG, variables: { slug: `${params?.slug}` }});

	if (!data.games.length) {
		return { notFound: true };
	}

	const game = data.games[0];

	const descriptionHTML = `
		<img src="https://items.gog.com/not_a_cp/ENG_product-page-addons-2020_yellow_on_black.png"><br>
		* Exclusive Digital Comic - Cyberpunk 2077: Big City Dreams will be available in English only.
		<hr><p class="module">Korean Voiceover will be added on 11th December 2020.</p><br><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-About-the-Game.png"><br><br><b>Cyberpunk 2077</b> is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.
		<br><br><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-Mercenary-Outlaw.png"><br><br>
		Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements and build your legend on the streets of Night City.
		<br><br><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-City-of-the-Future.png"><br><br>
		Enter the massive open world of Night City, a place that sets new standards in terms of visuals, complexity and depth.
		<br><br><img alt="" src="https://items.gog.com/not_a_cp/EN/EN-Eternal-Life.png"><br><br>
		Take the riskiest job of your life and go after a prototype implant that is the key to immortality.


		<p class="description__copyrights">
			CD PROJEKT®, Cyberpunk®, Cyberpunk 2077® are registered trademarks of CD PROJEKT S.A. © 2019
			CD PROJEKT S.A. All rights reserved. All other copyrights and trademarks are the property of their
			respective owners.
		</p>
	`;

	return {
		props: {
			revalidate: 60,
			cover: `http://localhost:1337/${game.cover?.src}`,
			gameInfo: {
				title: game.name,
				price: game.price,
				description: game.short_description,
			},
			gallery: game.gallery,
			description: game.description,
			details: {
				developr: game.developers[0].name,
				releaseDate: game.release_date,
				platforms: game.platforms.map((platform) => platform.name),
				publisher: game.publisher?.name || '',
				rating: game.rating,
				genres: game.categories.map((category) => category.name),
			},
			upcommingGames: gamesMock,
			upcommingHighlight: highlightMock,
			recommendedGames: gamesMock,
		}
	};
}
