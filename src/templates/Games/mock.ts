import { QUERY_GAMES } from "graphql/queries/games";

export const gamesMock = {
	request: {
		query: QUERY_GAMES,
		variables: { limit: 15, where: {}}
	},
	result: {
		data: {
			games: [
				{
					name: 'Sample Game',
					slug: 'sample-game',
					short_description: 'sample description',
					price: 518.39,
					developers: [{ name: 'sample developer' }],
					cover: { src: 'sample-game.jpg' },
					__typename: 'Game',
				}
			]
		}
	}
};

export const fetchMoreMock = {
	request: {
		query: QUERY_GAMES,
		variables: { limit: 15, where:{}, start: 1 }
	},
	result: {
		data: {
			games: [
				{
					name: 'Fetch more Game',
					slug: 'fetch-more',
					short_description: 'fetch description',
					price: 518.39,
					developers: [{ name: 'fetch developer' }],
					cover: { src: 'fetch-game.jpg' },
					__typename: 'Game',
				}
			]
		}
	}
}