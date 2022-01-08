import Cart, { CartProps } from "templates/Cart";

import cardsMock from 'components/PaymentOptions/mock';
import itemsMock from 'components/CartList/mock';

import { initializeApollo } from "utils/apollo";
import { QueryRecommended } from "graphql/generated/QueryRecommended";
import { QUERY_RECOMMENDED } from "graphql/queries/recommended";
import { gamesMapper, highlightMapper } from "utils/mapper";

export default function CartPage(props: CartProps) {
	return (<Cart {...props} />);
}

export async function getServerSideProps() {
	const apolloClient = initializeApollo();

	const { data: { recommended }} = await apolloClient.query<QueryRecommended>({ query: QUERY_RECOMMENDED });

	return {
		props: {
			cards: cardsMock,
			items: itemsMock,
			total: 'R$ 430,00',
			recommendedTitle: recommended?.section?.title,
			recommendedGames: gamesMapper(recommended?.section?.games),
			recommendedHighlight: highlightMapper(recommended?.section?.highlight),
		}
	};
}
