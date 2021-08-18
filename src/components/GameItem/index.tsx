import { MdFileDownload } from 'react-icons/md';
import * as S from './styles';

export type GameItemProps = {
	img: string;
	title: string;
	price: string;
	downloadLink?: string;
}

export default function GameItem({ img, title, price, downloadLink }: GameItemProps) {
	return (
		<S.Wrapper>
            <S.GameContent>
				<S.ImageBox>
					<img src={img} alt="" />
				</S.ImageBox>

				<S.Content>
					<S.Title>
						{title}

						{!!downloadLink &&
						<S.DownloadLink href={downloadLink} target="_blank" aria-label={`Get ${title} here`}>
							<MdFileDownload size={22} />
						</S.DownloadLink>}
					</S.Title>
					<S.Price>{price}</S.Price>
				</S.Content>
			</S.GameContent>
		</S.Wrapper>
	);
};