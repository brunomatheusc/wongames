import { QueryGames_games } from 'graphql/generated/QueryGames';
import { QueryHome_banners } from 'graphql/generated/QueryHome';
import { QueryOrders_orders } from 'graphql/generated/QueryOrders';
import { bannerMapper, cartMapper, gamesMapper, highlightMapper, ordersMapper } from '.';

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

describe('ordersMapper', () => {
	it('should return empty array if no games', () => {
		expect(ordersMapper(undefined)).toStrictEqual([]);
	});

	it('should return mapped items', () => {
		const orders = [
			{
				__typename: "Order",
				id: '1',
				card_brand: 'visa',
				card_last4: '4242',
				created_at: '2022-05-18T18:41:38.358Z',
				games: [
					{
						id: '1',
						name: 'game',
						developers: [
							{ name: 'developer' }
						],
						slug: 'game',
						cover: {
							url: '/image.jpg',
						},
						price: 10
					}
				]
			}
		] as QueryOrders_orders[];

		expect(ordersMapper(orders)).toStrictEqual([
			{
				id: '1',
				paymentInfo: {
					flag: 'visa',
					img: '/img/cards/visa.png',
					number: '**** **** **** 4242',
					purchaseDate: 'Purchase made on May 18, 2022'
				},
				games: [
					{
						id: '1',
						img: 'http://localhost:1337/image.jpg',
						title: 'game',
						price: '$10.00',
						downloadLink: 'https://wongames.com/game/donwload/yuYT56Tgh431LkjhNBgdf'
					}
				]
			}
		]);
	});

	it('should return free game when its free', () => {
		const orders = [
			{
				__typename: "Order",
				id: '1',
				card_brand: null,
				card_last4: null,
				created_at: '2022-05-18T18:41:38.358Z',
				games: [
					{
						id: '1',
						name: 'game',
						developers: [
							{ name: 'developer' }
						],
						slug: 'game',
						cover: {
							url: '/image.jpg',
						},
						price: 10
					}
				]
			}
		] as QueryOrders_orders[];

		expect(ordersMapper(orders)).toStrictEqual([
			{
				id: '1',
				paymentInfo: {
					flag: null,
					img: null,
					number: 'Free Game',
					purchaseDate: 'Purchase made on May 18, 2022'
				},
				games: [
					{
						id: '1',
						img: 'http://localhost:1337/image.jpg',
						title: 'game',
						price: '$10.00',
						downloadLink: 'https://wongames.com/game/donwload/yuYT56Tgh431LkjhNBgdf'
					}
				]
			}
		]);
	});
});