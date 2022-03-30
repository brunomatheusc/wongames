import Wishlist, { WishlistTemplateProps } from "templates/Wishlist";

import gamesMock from 'components/GameCardSlider/mock';

import { gamesMapper, highlightMapper } from "utils/mappers";

import { initializeApollo } from "utils/apollo";
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';

import { GetServerSidePropsContext } from 'next';
import protectedRoutes from 'utils/protected-routes';

export default function WishlistPage(props: WishlistTemplateProps) {
	return <Wishlist {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const apolloClient = initializeApollo();
	const session = await protectedRoutes(context);

	const { data: { recommended }} = await apolloClient.query<QueryRecommended>({ query: QUERY_RECOMMENDED });

	return {
		props: {
			games: gamesMock,
			recommendedTitle: recommended?.section?.title,
			recommendedGames: gamesMapper(recommended?.section?.games),
			recommendedHighlight: highlightMapper(recommended?.section?.highlight),
			session,
		}
	};
}