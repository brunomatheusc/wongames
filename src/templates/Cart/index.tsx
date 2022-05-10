import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Session } from "next-auth";

import Base from 'templates/Base';

import CartList, { CartListProps } from 'components/CartList';
import { Container } from 'components/Container';
import { Divider } from 'components/Divider';
import { GameCardProps } from 'components/GameCard';
import Heading from 'components/Heading';
import { HighlightProps } from 'components/Highlight';
import PaymentForm from 'components/PaymentForm';
import Showcase from 'components/Showcase';

import * as S from './styles';

export type CartProps = {
	session: Session;
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
} & CartListProps;

export default function Cart({ recommendedGames, recommendedHighlight, session }: CartProps) {
	const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

	return (
		<Base>
			<Container>
				<Heading lineLeft lineColor="secondary">My Cart</Heading>

				<S.Content>
					<CartList />

					<Elements stripe={stripe}>
						<PaymentForm session={session} />
					</Elements>
				</S.Content>

				<Divider />
			</Container>

			<Showcase title="You may like these games" games={recommendedGames} highlight={recommendedHighlight} />
		</Base>
	);
};