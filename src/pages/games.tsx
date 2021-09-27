import GamesTemplate, { GameTemplateProps } from "templates/Games";

import filterItemsMock from 'components/ExploreSidebar/mock';
import gamesMock from 'components/GameCardSlider/mock';
import { initializeApollo } from "utils/apollo";
import gql from "graphql-tag";

export default function GamesPage(props: GameTemplateProps) {
	return (<GamesTemplate {...props} />);
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query({ query: gql`
		query QueryGames {
			games {
				name
				slug
				cover {
					url
				}
				developers {
					name
				}
				price
			}
		}
	`});

	const games = data.games.map((game: any) => ({
		title: game.name,
		developer: game.developers[0].name,
		img: `http://localhost:1337${game.cover.url}`,
		price: new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(game.price)
	}));

	return {
		props: {
			revalidate: 60,
			games,
			filterItems: filterItemsMock,
		}
	};
}
