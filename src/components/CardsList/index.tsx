import Heading from 'components/Heading';
import { PaymentCard } from 'components/PaymentOptions';
import * as S from './styles';

export type CardsListProps = {
	cards?: PaymentCard[];
}

export default function CardsList({ cards }: CardsListProps) {
	return (
		<>
            <Heading lineBottom color="black" size="small">My Cards</Heading>

			{ cards?.map((card) => (
				<S.Card key={card.number}>
					<img src={card.img} alt={card.flag} />
					<span>{ card.number }</span>
				</S.Card>
			))}
		</>
	);
};