import { tint } from 'polished';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		align-self: start;

		background: ${theme.colors.white};
	`}
`;

export const Footer = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 2rem;

		color: ${theme.colors.black};
		background: ${tint(0.2, theme.colors.lightGray)};

		font-weight: ${theme.font.bold};
		font-size: ${theme.font.sizes.small};

		${media.greaterThan('medium')`
			font-size: ${theme.font.sizes.medium};
			padding: ${theme.spacings.small};
		`}
	`}
`;

export const Total = styled.span`
	${({ theme }) => css`
		color: ${theme.colors.primary};
	`}
`;