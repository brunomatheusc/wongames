import Empty from 'components/Empty';
import GameItem, { GameItemProps, PaymentInfoProps } from 'components/GameItem';
import Heading from 'components/Heading';
import * as S from './styles';

type OrderProps = {
	id: string;
	paymentInfo: PaymentInfoProps;
	games: GameItemProps[]
};

export type OrdersListProps = {
	items?: OrderProps[];
}

export default function OrdersLists({ items = [] }: OrdersListProps) {
	return (
		<S.Wrapper>
            <Heading lineBottom lineColor="primary" color="black" size="small">My Orders</Heading>

		{ items.length ? (
			items.map((order) => {
				return order.games.map((game, index) => (
					<GameItem
						key={`game-item-${index}-${order.id}`}
						{...game}
						paymentInfo={order.paymentInfo}
					/>
				))
			})
		) : (
			<Empty title="You have no orders yet" description="Go back to the store and explore great games and offers" hasLink />
		)}
		</S.Wrapper>
	);
};