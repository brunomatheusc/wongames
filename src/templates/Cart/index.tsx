import Base from 'templates/Base';

import CartList, { CartListProps } from 'components/CartList';
import { Container } from 'components/Container';
import { Divider } from 'components/Divider';
import { GameCardProps } from 'components/GameCard';
import Heading from 'components/Heading';
import { HighlightProps } from 'components/Highlight';
import PaymentOptions, { PaymentOptionsProps } from 'components/PaymentOptions';
import Showcase from 'components/Showcase';

import * as S from './styles';

export type CartProps = {
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
} & CartListProps & Pick<PaymentOptionsProps, 'cards'>;

export default function Cart({ recommendedGames, recommendedHighlight, cards }: CartProps) {
	const handlePayment = () => ({});

	return (
		<Base>
			<Container>
				<Heading lineLeft lineColor="secondary">My Cart</Heading>

				<S.Content>
					<CartList />

					<PaymentOptions cards={cards} handlePayment={handlePayment} />
				</S.Content>

				<Divider />
			</Container>

			<Showcase title="You may like these games" games={recommendedGames} highlight={recommendedHighlight} />
		</Base>
	);
};