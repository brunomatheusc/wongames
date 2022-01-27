import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { KeyboardArrowDown } from '@styled-icons/material-outlined';

import Base from 'templates/Base';

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import GameCard from 'components/GameCard';

import { useQueryGames } from 'graphql/queries/games';
import { parseQueryStringToWhere, parseQueryStringToFilter } from 'utils/filter';

import { Grid } from 'components/Grid';
import * as S from './styles';

export type GameTemplateProps = {
	filterItems: ItemProps[];
};

export default function GamesTemplate({ filterItems }: GameTemplateProps) {
	const { push, query } = useRouter();
	const { data, loading, error, fetchMore } = useQueryGames({
		variables: {
			limit: 15,
			where: parseQueryStringToWhere({ queryString: query, filterItems }),
			sort: query.sort as string | null,
		}
	});

	function handleFilter(items: ParsedUrlQueryInput) {
		push({ pathname: '/games', query: items });
		return;
	}

	function handleShowMore() {
		fetchMore({
			variables: {
				limit: 15,
				start: data?.games.length
			}
		});

		return;
	}

	return (
		<Base>
			<S.Main>
				<ExploreSidebar initialValues={parseQueryStringToFilter({ queryString: query, filterItems })} items={filterItems} onFilter={handleFilter} />

				<section>
					<Grid>
						{data?.games && data.games.map(({ slug, name, developers, price, cover }, index) => (
							<GameCard
								key={`${slug}-${index}`}
								title={name}
								slug={slug}
								developer={developers[0].name}
								img={`http://localhost:1337${cover?.url}`}
								price={price}
							/>
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