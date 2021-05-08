import { ReactNode } from 'react';
import * as S from './styles';

export type ButtonProps = {
	children?: ReactNode;
	size: 'small' | 'medium' | 'large';
}

export default function Button({ children, size = 'medium' }: ButtonProps) {
	return (
		<S.Wrapper size={size}>
			{ !!children && <span>{ children }</span> }
		</S.Wrapper>
	);
};