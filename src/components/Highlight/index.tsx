import Image from 'next/image';
import Button from 'components/Button';

import * as S from './styles';

export type HighlightProps = {
	title: string;
	subtitle: string;
	backgroundImage: string;
	floatImage?: string;
	alignment?: 'right' | 'left';
	buttonLabel: string;
	buttonLink: string;
}

export default function Highlight({ title, subtitle, backgroundImage, floatImage, alignment = 'right', buttonLabel, buttonLink }: HighlightProps) {
	return (
		<S.Wrapper alignment={alignment} data-cy="highlight">
			<Image src={backgroundImage} alt={title} layout="fill" />

			{ !!floatImage && (
				<S.FloatImageWrapper>
					<Image src={floatImage} alt={title} width={400} height={300} />
				</S.FloatImageWrapper>
			)}

			<S.Content>
				<S.Title>{title}</S.Title>
				<S.Subtitle>{subtitle}</S.Subtitle>
				<Button as="a" href={buttonLink}>{ buttonLabel }</Button>
			</S.Content>
		</S.Wrapper>
	);
};