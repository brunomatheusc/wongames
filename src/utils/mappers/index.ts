import { QueryGames_games } from "graphql/generated/QueryGames";
import { QueryHome_banners, QueryHome_sections_freeGames_highlight } from "graphql/generated/QueryHome";
import { QueryOrders_orders } from "graphql/generated/QueryOrders";
import { QueryWishlist_wishlists_games} from "graphql/generated/QueryWishlist";

import formatPrice from "utils/format-price";
import { getImageUrl } from "utils/getImageUrl";

export function bannerMapper(banners: QueryHome_banners[]) {
	return banners.map(({ image, title, subtitle, button, ribbon }) => ({
		img: `${getImageUrl(image?.url)}`,
		title: title,
		subtitle: subtitle,
		...(button && {
			buttonLabel: button.label,
			buttonLink: button.link,
		}),
		...(ribbon && {
			ribbon: ribbon.text,
			ribbonColor: ribbon.color,
			ribbonSize: ribbon.size
		})
	}));
}

export function gamesMapper(games: QueryGames_games[] | QueryWishlist_wishlists_games[] | null | undefined) {
	return games ? games.map(({ id, name, slug, developers, cover, price }) => ({
		id: id,
		title: name,
		slug,
		developer: developers[0].name,
		img: `${getImageUrl(cover?.url)}`,
		price
	})) : [];
}

export function highlightMapper(highlight: QueryHome_sections_freeGames_highlight | null | undefined) {
	return highlight && {
		title: highlight?.title,
		subtitle: highlight?.subtitle,
		backgroundImage: `${getImageUrl(highlight?.background?.url)}`,
		floatImage: `${getImageUrl(highlight?.floatImage?.url)}`,
		buttonLabel: highlight?.buttonLabel,
		buttonLink: highlight?.buttonLink,
		alignment: highlight?.alignment
	};
}

export function cartMapper(games: QueryGames_games[] | undefined) {
	return games ? games.map(({ id, cover, name: title, price }) => ({
		id,
		img: `${getImageUrl(cover?.url)}`,
		title,
		price: formatPrice(price)
	})) : [];
}

export function ordersMapper(orders: QueryOrders_orders[] | undefined) {
	return orders ? orders.map((order) => {
		return {
			id: order.id,
			paymentInfo: {
				flag: order.card_brand,
				img: order.card_brand ? `/img/cards/${order.card_brand}.png` : null,
				number: order.card_last4 ? `**** **** **** ${order.card_last4}` : 'Free Game',
				purchaseDate: `Purchase made on ${new Intl.DateTimeFormat(
					'en-US', {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					}
				).format(new Date(order.created_at))}`
			},
			games: order.games.map(game => ({
				id: game.id,
				title: game.name,
				downloadLink: 'https://wongames.com/game/donwload/yuYT56Tgh431LkjhNBgdf',
				img: `${getImageUrl(game.cover?.url)}`,
				price: formatPrice(game.price)
			}))
		};
	}) : [];
}