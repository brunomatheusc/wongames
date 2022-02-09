import { QueryGames_games } from "graphql/generated/QueryGames";
import { QueryHome_banners, QueryHome_sections_freeGames_highlight } from "graphql/generated/QueryHome";
import formatPrice from "utils/format-price";

export function bannerMapper(banners: QueryHome_banners[]) {
	return banners.map(({ image, title, subtitle, button, ribbon }) => ({
		img: `http://localhost:1337${image?.url}`,
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

export function gamesMapper(games: QueryGames_games[] | null | undefined) {
	return games ? games.map(({ id, name, slug, developers, cover, price }) => ({
		id: id,
		title: name,
		slug,
		developers: developers[0].name,
		img: `http://localhost:1337${cover?.url}`,
		price
	})) : [];
}

export function highlightMapper(highlight: QueryHome_sections_freeGames_highlight | null | undefined) {
	return highlight && {
		title: highlight?.title,
		subtitle: highlight?.subtitle,
		backgroundImage: `http://localhost:1337${highlight?.background?.url}`,
		floatImage: `http://localhost:1337${highlight?.floatImage?.url}`,
		buttonLabel: highlight?.buttonLabel,
		buttonLink: highlight?.buttonLink,
		alignment: highlight?.alignment
	};
}

export function cartMapper(games: QueryGames_games[] | undefined) {
	return games ? games.map(({ id, cover, name: title, price }) => ({
		id,
		img: `http://localhost:1337${cover?.url}`,
		title,
		price: formatPrice(price)
	})) : [];
}