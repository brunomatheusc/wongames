import * as S from './styles';
import Button from 'components/Button';
import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon';
import { ReactNode } from 'react';

export type BannerProps = {
	img: string;
	title: string;
	subtitle: string;
	buttonLabel: string;
	buttonLink: string;
	ribbon?: ReactNode;
	ribbonSize?: RibbonSizes;
	ribbonColor?: RibbonColors;
};

export default function Banner({ img, title, subtitle, buttonLabel, buttonLink, ribbon, ribbonColor, ribbonSize }: BannerProps) {
	return (
		<S.Wrapper>
			{ !!ribbon && <Ribbon color={ribbonColor} size={ribbonSize}>{ ribbon}</Ribbon>}

            <S.Image src={img} role="img" aria-label={title} />

			<S.Caption>
				<S.Title>{title}</S.Title>
				<S.Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
				<Button as="a" href={buttonLink} size="large">{buttonLabel}</Button>
			</S.Caption>
		</S.Wrapper>
	);
};