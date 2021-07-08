import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import * as S from './styles';

export type TextFieldProps = {
	label?: string;
	labelFor?: string;
	labelColor?: 'white' | 'black';
	onInput?: (value?: string) => void;
	initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({label, labelFor = '', initialValue = '', onInput, ...props}: TextFieldProps) {
	const [value, setValue] = useState(initialValue);

	function onChange (e: ChangeEvent<HTMLInputElement>) {
		const newValue = e.currentTarget.value;
		setValue(newValue);

		!!onInput && onInput(newValue);
	}

	return (
		<S.Wrapper>
			{ !!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}

			<S.InputWrapper>
				<S.Input type="text" onChange={onChange} value={value} { ...props } />
			</S.InputWrapper>
		</S.Wrapper>
	);
};