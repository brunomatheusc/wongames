import { ReactNode } from 'react';
import * as S from './styles';

export type ButtonProps = {
	children?: ReactNode;
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
}

export default function Button({ children, size = 'medium', fullWidth = false }: ButtonProps) {
	return (
		<S.Wrapper size={size} fullWidth={fullWidth}>
			{ !!children && <span>{ children }</span> }
		</S.Wrapper>
	);
};