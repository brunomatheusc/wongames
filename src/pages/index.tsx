import Home, { HomeTemplateProps } from "templates/Home";

import highlightMock from 'components/Highlight/mock';

import { QueryHome } from "graphql/generated/QueryHome";
import { QUERY_HOME } from "graphql/queries/home";

import { initializeApollo } from "utils/apollo";
import { bannerMapper, gamesMapper, highlightMapper } from "utils/mapper";

export default function Index(props: HomeTemplateProps) {
	return <Home {...props} />;
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const { data: { banners, newGames, upcomingGames, freeGames, sections }} = await apolloClient.query<QueryHome>({ query: QUERY_HOME });


	return {
		props: {
			revalidate: 60,
			banners: bannerMapper(banners),
			newGames: gamesMapper(newGames),
			upcomingGames: gamesMapper(upcomingGames),
			mostPopularGames: gamesMapper(sections?.popularGames!.games),
			freeGames: gamesMapper(freeGames),
			mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
			upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
			freeHighlight: highlightMapper(sections?.freeGames?.highlight),
			newGamesTitle: sections?.newGames?.title,
			mostPopularGamesTitle: sections?.popularGames?.title,
			upcomingGamesTitle: sections?.upcomingGames?.title,
			freeGamesTitle: sections?.freeGames?.title,
		}
	};
}