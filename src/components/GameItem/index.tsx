import * as S from './styles';

export type GameItemProps = {
	img: string;
	title: string;
	price: string;
}

export default function GameItem({ img, title, price }: GameItemProps) {
	return (
		<S.Wrapper>
            <S.GameContent>
				<S.ImageBox>
					<img src={img} alt="" />
				</S.ImageBox>

				<S.Content>
					<S.Title>{title}</S.Title>
					<S.Price>{price}</S.Price>
				</S.Content>
			</S.GameContent>
		</S.Wrapper>
	);
};