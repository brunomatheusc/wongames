import { GameCardProps } from 'components/GameCard';
import GameCardSlider from 'components/GameCardSlider';
import Heading from 'components/Heading';
import Highlight, { HighlightProps } from 'components/Highlight';

import * as S from './styles';

export type ShowCaseProps = {
	title?: string;
	highlight?: HighlightProps;
	games?: GameCardProps[];
};

export default function Showcase({ title, games, highlight }: ShowCaseProps) {
	return (
		<S.Wrapper>
			{ !!title && (
			<Heading lineLeft lineColor="secondary">
				{title}
			</Heading>
			)}

			{ !!highlight && <Highlight {...highlight} />}

			{ !!games && <GameCardSlider items={games} />}
		</S.Wrapper>
	);
};