import Home, { HomeTemplateProps } from "templates/Home";

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import { QueryHome } from "graphql/generated/QueryHome";
import { QUERY_HOME } from "graphql/queries/home";

import { initializeApollo } from "utils/apollo";

export default function Index(props: HomeTemplateProps) {
	return <Home {...props} />;
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const { data: { banners, newGames, upcomingGames, freeGames } } = await apolloClient.query<QueryHome>({ query: QUERY_HOME });

	return {
		props: {
			revalidate: 60,
			banners: banners.map(({ image, title, subtitle, button, ribbon }) => {
				return {
					img: `http://localhost:1337${image?.url}`,
					title: title,
					subtitle: subtitle,
					...(button && {
						buttonLabel: button.label,
						buttonLink: button.link,
					}),
					...(ribbon && {
						ribbon: ribbon.text,
						ribbonColor: ribbon.color,
						ribbonSize: ribbon.size
					})
				};
			}),
			newGames: newGames.map(({ name, slug, developers, cover, price }) => ({
				title: name,
				slug,
				developers: developers[0].name,
				img: `http://localhost:1337${cover?.url}`,
				price
			})),
			upcomingGames: upcomingGames.map(({ name, slug, developers, cover, price }) => ({
				title: name,
				slug,
				developers: developers[0].name,
				img: `http://localhost:1337${cover?.url}`,
				price
			})),
			mostPopularHighlight: highlightMock,
			mostPopularGames: gamesMock,
			upcomingHighlight: highlightMock,
			freeGames: freeGames.map(({ name, slug, developers, cover, price }) => ({
				title: name,
				slug,
				developers: developers[0].name,
				img: `http://localhost:1337${cover?.url}`,
				price
			})),
			freeHighlight: highlightMock,
		}
	};
}