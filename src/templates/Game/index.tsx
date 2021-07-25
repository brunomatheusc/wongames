import GameInfo, { GameInfoProps } from 'components/GameInfo';
import Base from 'templates/Base';

import * as S from './styles';

export type GameTemplateProps = {
	cover: string;
	gameInfo: GameInfoProps;
};

export default function Game({ cover, gameInfo }: GameTemplateProps) {
	return (
		<Base>
            <S.Cover src={cover} role="image" aria-label="cover" />

			<S.Main>
				<S.SectionGameInfo>
					<GameInfo {...gameInfo} />
				</S.SectionGameInfo>
			</S.Main>
		</Base>
	);
};