import Empty from 'components/Empty';
import GameItem, { GameItemProps } from 'components/GameItem';
import Heading from 'components/Heading';
import * as S from './styles';

export type OrdersListProps = {
	items?: GameItemProps[];
}

export default function OrdersLists({ items = [] }: OrdersListProps) {
	return (
		<S.Wrapper>
            <Heading lineBottom lineColor="primary" color="black" size="small">My Orders</Heading>

			{items?.map((item) => (
				<GameItem key={item.downloadLink} {...item} />
			))}

			{!items?.length && <Empty title="You have no orders yet" description="Go back to the store and explore great games and offers" hasLink /> }
		</S.Wrapper>
	);
};