import Base from 'templates/Base';

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import GameCard, { GameCardProps } from 'components/GameCard';

import * as S from './styles';
import { Grid } from 'components/Grid';
import { KeyboardArrowDown } from '@styled-icons/material-outlined';

export type GameTemplateProps = {
	games?: GameCardProps[];
	filterItems: ItemProps[];
};

export default function GamesTemplate({ games, filterItems }: GameTemplateProps) {
	function handleFilter() {
		return;
	}

	function handleShowMore() {
		return;
	}

	return (
		<Base>
			<S.Main>
				<ExploreSidebar items={filterItems} onFilter={handleFilter} />

				<section>
					<Grid>
						{games && games.map((game, index) => (
							<GameCard key={`${game.title}-${index}`} {...game} />
						))}
					</Grid>

					<S.ShowMore role="button" onClick={handleShowMore}>
						<p>Show More</p>
						<KeyboardArrowDown size={35} />
					</S.ShowMore>
				</section>
			</S.Main>
		</Base>
	);
};