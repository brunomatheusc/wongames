import { tint } from 'polished';
import styled, { css } from 'styled-components';

import * as ButtonStyles from 'components/Button/styles';
import { Theme } from 'types/styled-components';

export const Wrapper = styled.div`
	${({ theme }) => css`
		background: ${theme.colors.white};
	`}
`;

export const Body = styled.div`
	${({ theme }) => css`
		padding: ${theme.spacings.small};
	`}
`;

export const Footer = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;

		padding: ${theme.spacings.small};

		background: ${tint(0.2, theme.colors.lightGray)};
		color: ${theme.colors.black};

		font-weight: ${theme.font.bold};

		${ButtonStyles.Wrapper} {
			padding-left: ${theme.spacings.xxsmall};
			padding-right: ${theme.spacings.xxsmall};
			outline: 0;
		}
	`}
`;

export const CardsList = styled.div`
	display: flex;
	flex-direction: column;
`;

const ItemStyles = (theme: Theme) => css`
	display: flex;
	align-items: center;

	padding: 0 ${theme.spacings.xxsmall};
	height: 5rem;

	color: ${theme.colors.black};
	background: ${theme.colors.lightGray};
	border-radius: 0.2rem;

	cursor: pointer;
`;

export const CardItem = styled.div`
	${({ theme }) => css`
		${ItemStyles(theme)};
		justify-content: space-between;

		&:not(:last-child) {
			margin-bottom: ${theme.spacings.xxsmall};
		}
	`}
`;

export const CardInfo = styled.span`
	${({ theme }) => css`
		display: flex;
		align-items: center;

		img {
			margin-right: ${theme.spacings.xxsmall};
		}
	`}
`;

export const AddCard = styled.div`
	${({ theme }) => css`
		${ItemStyles(theme)};

		svg {
			margin-left: ${theme.spacings.xxsmall};
			margin-right: ${theme.spacings.xxsmall};
			width: 2.4rem;
		}
	`}
`;