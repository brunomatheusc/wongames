import Cart, { CartProps } from "templates/Cart";

import cardsMock from 'components/PaymentOptions/mock';
import itemsMock from 'components/CartList/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

export default function CartPage(props: CartProps) {
	return (<Cart {...props} />);
}

export async function getServerSideProps() {
	return {
		props: {
			cards: cardsMock,
			items: [],
			total: 'R$ 430,00',
			recommendedGames: gamesMock.slice(0, 5),
			recommendedHighlight: highlightMock,
		}
	};
}
