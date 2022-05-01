import styled, { css } from 'styled-components';

export const Wrapper = styled.main``;

export const Loading = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: center;

		height: 40rem;

		svg {
			height: 10rem;
			width: 10rem;
		}
	`}
`;