import { Container } from 'components/Container';
import { GameCardProps } from 'components/GameCard';
import Heading from 'components/Heading';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';
import Base from 'templates/Base';

import * as S from './styles';

export type WishlistTemplateProps = {
	recommendedGames: GameCardProps[];
	recommendedHighlight: HighlightProps;
}

export default function Wishlist({ recommendedGames, recommendedHighlight }: WishlistTemplateProps) {
	return (
		<Base>
			<Container>
	            <Heading lineLeft lineColor="secondary">Wishlist</Heading>
			</Container>

			<Showcase title="You may like these games" games={recommendedGames} highlight={recommendedHighlight} />
		</Base>
	);
};