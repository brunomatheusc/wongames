import Heading from 'components/Heading';
import MediaMatch from 'components/MediaMatch';
import * as S from './styles';

export default function GameDetails() {
	return (
		<S.Wrapper>
			<MediaMatch greaterThan="small">
	            <Heading lineLeft lineColor="secondary">Game Details</Heading>
			</MediaMatch>

			<S.Content>
				<S.Block>
					<S.Title>Developer</S.Title>
					<S.Description>Gearbox Software</S.Description>
				</S.Block>

				<S.Block>
					<S.Title>Platforms</S.Title>
					<S.Description>Nov 16, 2019</S.Description>
				</S.Block>

				<S.Block>
					<S.Title>Publisher</S.Title>
					<S.Description>2k</S.Description>
				</S.Block>

				<S.Block>
					<S.Title>Rating</S.Title>
					<S.Description>18+</S.Description>
				</S.Block>

				<S.Block>
					<S.Title>Genre</S.Title>
					<S.Description>Action/Adventure</S.Description>
				</S.Block>
			</S.Content>
		</S.Wrapper>
	);
};