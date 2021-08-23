import * as S from './styles';

import GameItem, { GameItemProps } from 'components/GameItem';

export type CartListProps = {
	items: GameItemProps[];
	total: string;
};

export default function CartList({ items, total }: CartListProps) {
	return (
		<S.Wrapper>
            { items.map((item) => (
				<GameItem key={item.title} {...item} />
			))}

			<S.Footer>Total <S.Total>{ total }</S.Total></S.Footer>
		</S.Wrapper>
	);
};