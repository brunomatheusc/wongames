import { QueryGames_games } from 'graphql/generated/QueryGames';
import { QueryHome_banners } from 'graphql/generated/QueryHome';
import { bannerMapper, cartMapper, gamesMapper, highlightMapper } from '.';

describe('bannerMapper()', () => {
	it('should return the right format when mapped', () => {
		const banner = {
			image: {
				url: '/image.jpg'
			},
			title: 'Banner title',
			subtitle: 'Banner subtitle',
			button: {
				label: 'button label',
				link: 'button link',
			},
			ribbon: {
				text: '',
				color: 'primary',
				size: 'normal'
			}
		} as QueryHome_banners;

		expect(bannerMapper([banner])).toStrictEqual([
			{
				img: 'http://localhost:1337/image.jpg',
				title: 'Banner title',
				subtitle: 'Banner subtitle',
				buttonLabel: 'button label',
				buttonLink: 'button link',
				ribbon: 'ribbon text',
				ribbonColor: 'primary',
				ribbonSize: 'normal'
			}
		]);
	});
});

describe('gamesMapper()', () => {
	it("should return an empty array if there are no games", () => {
		expect(gamesMapper(null)).toStrictEqual([]);
	});

	it("should return the correct format when mapped", () => {
		const game = {
			id: '1',
			name: 'game',
			developers: [{ name: 'developer' }],
			slug: 'game',
			cover: {
				url: '/image.jpg'
			},
			price: 10,
		} as QueryGames_games;

		expect(gamesMapper([game])).toStrictEqual([
			{
				id: '1',
				title: 'game',
				slug: 'game',
				developer: 'developer',
				img: 'http://localhost:1337/image.jpg',
				price: 10
			}
		])
	});
});

describe('cartMapper', () => {
	it('should return empty array if no games', () => {
		expect(cartMapper(undefined)).toStrictEqual([]);
	});

	it('should return mapped items', () => {
		const game = {
			id: '1',
			cover: {
				url: '/image.jpg',
			},
			name: 'game',
			price: 10,
		} as QueryGames_games;

		expect(cartMapper([game])).toStrictEqual([
			{
				id: '1',
				img: 'http://localhost:1337/image.jpg',
				title: 'game',
				price: '$10.00',
			}
		])
	});
});