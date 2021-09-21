import GamesTemplate, { GameTemplateProps } from "templates/Games";

import filterItemsMock from 'components/ExploreSidebar/mock';
import gamesMock from 'components/GameCardSlider/mock';

export default function GamesPage(props: GameTemplateProps) {
	return (<GamesTemplate {...props} />);
}

export async function getServerSideProps() {
	return {
		props: {
			games: gamesMock,
			filterItems: filterItemsMock,
		}
	};
}
