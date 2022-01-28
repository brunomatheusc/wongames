import Home, { HomeTemplateProps } from "templates/Home";

import { QueryHome, QueryHomeVariables } from "graphql/generated/QueryHome";
import { QUERY_HOME } from "graphql/queries/home";

import { initializeApollo } from "utils/apollo";
import { bannerMapper, gamesMapper, highlightMapper } from "utils/mappers";

export default function Index(props: HomeTemplateProps) {
	return <Home {...props} />;
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();
	const TODAY = new Date().toISOString().slice(0, 10);

	const { data: { banners, newGames, upcomingGames, freeGames, sections }} = await apolloClient.query<QueryHome, QueryHomeVariables>({
		query: QUERY_HOME,
		variables: { release_date: TODAY },
		fetchPolicy: "no-cache"
	});


	return {
		revalidate: 60,
		props: {
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