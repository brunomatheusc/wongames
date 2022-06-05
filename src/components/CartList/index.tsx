import Link from 'next/link';
import * as S from './styles';

import GameItem from 'components/GameItem';
import Button from 'components/Button';
import Empty from 'components/Empty';
import Loader from 'components/Loader';
import { useCart } from 'hooks/use-cart';

export type CartListProps = {
	hasButton?: boolean;
};

export default function CartList({ hasButton = false }: CartListProps) {
	const { items, total, loading } = useCart();

	if (loading) {
		return (
			<S.Loading>
				<Loader />
			</S.Loading>
		);
	}

	return (
		<S.Wrapper isEmpty={!items.length} data-cy="cart-list">
		{!!items.length ? (
		<>
			<S.GamesList>
			{ items.map((item) => (
				<GameItem key={item.title} {...item} />
			))}
			</S.GamesList>

			<S.Footer>
				{ !hasButton && <span>Total: </span>}
				<S.Total>{ total }</S.Total>

				{ hasButton && (
				<Link href="/cart">
					<Button as="a">Buy it now</Button>
				</Link>
				)}
			</S.Footer>

		</>
		) : (
			<Empty title="Your cart is empty" description="Go back to the store and explore great games offers." hasLink />
		)}
		</S.Wrapper>
	);
};