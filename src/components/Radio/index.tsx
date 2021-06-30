import { InputHTMLAttributes } from 'react';
import * as S from './styles';

type RadioValue = string | ReadonlyArray<string> | number;

export type RadioProps = {
	label?: string;
	labelFor?: string;
	labelColor?: 'white' | 'black';
	onCheck?: (value?: RadioValue) => void;
	value?: RadioValue;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Radio({ label, labelFor = '', labelColor = 'white', onCheck, value, ...props }: RadioProps) {
	function onChange () {
		!!onCheck && onCheck(value);
	}

	return (
		<S.Wrapper>
            <S.Input id={labelFor} type="radio" value={value} onChange={onChange} {...props} />
			{ !!label && <S.Label htmlFor={labelFor} labelColor={labelColor}>{label}</S.Label> }
		</S.Wrapper>
	);
};