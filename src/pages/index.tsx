import Home, { HomeTemplateProps } from "templates/Home";

import highlightMock from 'components/Highlight/mock';

import { QueryHome } from "graphql/generated/QueryHome";
import { QUERY_HOME } from "graphql/queries/home";

import { initializeApollo } from "utils/apollo";

export default function Index(props: HomeTemplateProps) {
	return <Home {...props} />;
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const { data: { banners, newGames, upcomingGames, freeGames, sections }} = await apolloClient.query<QueryHome>({ query: QUERY_HOME });


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
			newGamesTitle: sections?.newGames?.title,
			mostPopularGamesTitle: sections?.popularGames?.title,
			upcomingGamesTitle: sections?.upcomingGames?.title,
			freeGamesTitle: sections?.freeGames?.title,
			upcomingGames: upcomingGames.map(({ name, slug, developers, cover, price }) => ({
				title: name,
				slug,
				developers: developers[0].name,
				img: `http://localhost:1337${cover?.url}`,
				price
			})),
			mostPopularHighlight: {
				title: sections?.popularGames?.highlight?.title,
				subtitle: sections?.popularGames?.highlight?.subtitle,
				backgroundImage: `http://localhost:1337${sections?.popularGames?.highlight?.background?.url}`,
				floatImage: `http://localhost:1337${sections?.popularGames?.highlight?.floatImage?.url}`,
				buttonLabel: sections?.popularGames?.highlight?.buttonLabel,
				buttonLink: sections?.popularGames?.highlight?.buttonLink,
				alignment: sections?.popularGames?.highlight?.alignment
			},
			mostPopularGames: sections?.popularGames!.games.map(({ name, slug, developers, cover, price }) => ({
				title: name,
				slug,
				developers: developers[0].name,
				img: `http://localhost:1337${cover?.url}`,
				price
			})),
			upcomingHighlight: {
				title: sections?.upcomingGames?.highlight?.title,
				subtitle: sections?.upcomingGames?.highlight?.subtitle,
				backgroundImage: `http://localhost:1337${sections?.upcomingGames?.highlight?.background?.url}`,
				floatImage: `http://localhost:1337${sections?.upcomingGames?.highlight?.floatImage?.url}`,
				buttonLabel: sections?.upcomingGames?.highlight?.buttonLabel,
				buttonLink: sections?.upcomingGames?.highlight?.buttonLink,
				alignment: sections?.upcomingGames?.highlight?.alignment
			},
			freeGames: freeGames.map(({ name, slug, developers, cover, price }) => ({
				title: name,
				slug,
				developers: developers[0].name,
				img: `http://localhost:1337${cover?.url}`,
				price
			})),
			freeHighlight: {
				title: sections?.freeGames?.highlight?.title,
				subtitle: sections?.freeGames?.highlight?.subtitle,
				backgroundImage: `http://localhost:1337${sections?.freeGames?.highlight?.background?.url}`,
				floatImage: `http://localhost:1337${sections?.freeGames?.highlight?.floatImage?.url}`,
				buttonLabel: sections?.freeGames?.highlight?.buttonLabel,
				buttonLink: sections?.freeGames?.highlight?.buttonLink,
				alignment: sections?.freeGames?.highlight?.alignment
			},
		}
	};
}