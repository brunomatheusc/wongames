import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { HighlightProps } from '.';

type WrapperProps = Pick<HighlightProps, 'backgroundImage'>;

export const Wrapper = styled.section<WrapperProps>`
	${({ backgroundImage }) => css`
		display: grid;
		grid-template-areas: 'floatImage content';
		grid-template-columns: 1.3fr 2fr;
		position: relative;
		height: 23rem;

		background-image: url(${backgroundImage});
		background-position: center center;
		background-size: cover;

		&::after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.6);
		}

		${media.greaterThan('medium')`
			height: 32rem;
		`}
	`}
`;

export const FloatImage = styled.img`
	${({ theme }) => css`
		grid-area: floatImage;
		max-height: 23rem;
		z-index: ${theme.layers.base};
		align-self: end;

		${media.greaterThan('medium')`
			max-height: 32rem;
		`}
	`}
`;

export const Content = styled.div`
	${({ theme }) => css`
		grid-area: content;
		z-index: ${theme.layers.base};
		text-align: right;
		padding: ${theme.spacings.xsmall};

		${media.greaterThan('medium')`
			align-self: end;
			padding: ${theme.spacings.large};
		`}
	`}
`;

export const Title = styled.h1`
	${({ theme }) => css`
		font-size: ${theme.font.sizes.large};
		font-weight: ${theme.font.bold};
		color: ${theme.colors.white};

		${media.greaterThan('medium')`
			font-size: ${theme.font.sizes.xxlarge};
		`}
	`}
`;

export const Subtitle = styled.h2`
	${({ theme }) => css`
		font-size: ${theme.font.sizes.small};
		font-weight: ${theme.font.light};
		color: ${theme.colors.white};
		margin-bottom: ${theme.spacings.small};

		${media.greaterThan('medium')`
			font-size: ${theme.font.sizes.large};
		`}
	`}
`;