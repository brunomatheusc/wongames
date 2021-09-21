import Link from 'next/link';
import * as S from './styles';

import GameItem, { GameItemProps } from 'components/GameItem';
import Button from 'components/Button';

export type CartListProps = {
	items: GameItemProps[];
	total: string;
	hasButton?: boolean;
};

export default function CartList({ items, total, hasButton = false }: CartListProps) {
	return (
		<S.Wrapper>
            { items.map((item) => (
				<GameItem key={item.title} {...item} />
			))}

			<S.Footer>
				{ !hasButton && <span>Total: </span>}
				<S.Total>{ total }</S.Total>

				{ hasButton && (
				<Link href="/cart">
					<Button as="a">Buy it now</Button>
				</Link>
				)}
			</S.Footer>
		</S.Wrapper>
	);
};