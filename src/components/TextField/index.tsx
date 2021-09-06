import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react';
import * as S from './styles';

export type TextFieldProps = {
	disabled?: boolean;
	error?: string;
	icon?: ReactNode;
	iconPosition?: 'left' | 'right';
	label?: string;
	labelColor?: 'white' | 'black';
	onInput?: (value?: string) => void;
	initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({ error, label, initialValue = '', onInput, icon, iconPosition = 'left', disabled = false, name, ...props}: TextFieldProps) {
	const [value, setValue] = useState(initialValue);

	function onChange (e: ChangeEvent<HTMLInputElement>) {
		const newValue = e.currentTarget.value;
		setValue(newValue);

		!!onInput && onInput(newValue);
	}

	return (
		<S.Wrapper disabled={disabled} error={!!error}>
			{ !!label && <S.Label htmlFor={name}>{label}</S.Label>}

			<S.InputWrapper>
				{ !!icon && <S.Icon iconPosition={iconPosition}>{ icon }</S.Icon> }
				<S.Input type="text" onChange={onChange} value={value} iconPosition={iconPosition} disabled={disabled} {...(label ? { id: name } : {})} { ...props } />
			</S.InputWrapper>

			{ !! error && <S.Error>{ error }</S.Error> }
		</S.Wrapper>
	);
};