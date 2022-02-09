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
					id: '1',
					name: 'Sample Game',
					slug: 'sample-game',
					short_description: 'sample description',
					price: 518.39,
					developers: [{ name: 'sample developer' }],
					cover: { src: 'sample-game.jpg' },
					__typename: 'Game',
				}
			],
			gamesConnection: {
				values: [{ id: '1' }, { id: '2' }],
				__typename: 'GameConnection',
			}
		}
	}
};

export const cartItems = [
	{
		id: '1',
		img: 'http://localhost:1337/sample-game.jpg',
		price: '$10.50',
		title: 'Sample Game',
	},
	{
		id: '2',
		img: 'http://localhost:1337/sample-game.jpg',
		price: '$10.50',
		title: 'Sample Game',
	},
];