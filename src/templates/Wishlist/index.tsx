import { Container } from 'components/Container';
import GameCard, { GameCardProps } from 'components/GameCard';
import Heading from 'components/Heading';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';
import Base from 'templates/Base';

import * as S from './styles';

export type WishlistTemplateProps = {
	games?: GameCardProps[];
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
}

export default function Wishlist({ games, recommendedGames, recommendedHighlight }: WishlistTemplateProps) {
	return (
		<Base>
			<Container>
	            <Heading lineLeft lineColor="secondary">Wishlist</Heading>

				{games?.map((game, index) => (
					<GameCard key={`game-card-${index}`} {...game} />
				))}
			</Container>

			<Showcase title="You may like these games" games={recommendedGames} highlight={recommendedHighlight} />
		</Base>
	);
};