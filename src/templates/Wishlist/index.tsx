import Base from 'templates/Base';

import { Container } from 'components/Container';
import { Divider } from 'components/Divider';
import GameCard, { GameCardProps } from 'components/GameCard';
import { Grid } from 'components/Grid';
import Heading from 'components/Heading';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';

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

				<Grid>
					{games?.map((game, index) => (
						<GameCard key={`game-card-${index}`} {...game} />
					))}
				</Grid>

				<Divider />
			</Container>

			<Showcase title="You may like these games" games={recommendedGames} highlight={recommendedHighlight} />
		</Base>
	);
};