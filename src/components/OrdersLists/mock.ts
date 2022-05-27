import { GameItemProps } from "components/GameItem";

export default [
	{
		id: '1',
		games: [
			{
				id: '1',
				img: 'https://source.unsplash.com/user/willianjusten/151x70',
				title: 'Red Dead Redemption 2',
				price: '$ 215,00',
				downloadLink: 'https://wongames.com/game/download/yuYT56tgh431LkjhNBgdf',
			}
		],
		paymentInfo: {
			flag: 'visa',
			img: '/img/cards/visa.png',
			number: '**** **** **** 4242',
			purchaseDate: 'Purchase made on Apr 14, 2022',
		}
	},
	{
		id: '2',
		paymentInfo: {
			flag: 'mastercard',
			img: '/img/cards/mastercard.png',
			number: '**** **** **** 4444',
			purchaseDate: 'Purchase made on Apr 14, 2022',
		},
		games: [
			{
				id: '1',
				img: 'https://source.unsplash.com/user/willianjusten/151x70',
				title: 'Red Dead Redemption 2',
				price: '$ 215,00',
				downloadLink: 'https://wongames.com/game/download/yuYT56tgh431LkjhNBgdf',
			}
		],
	},
];