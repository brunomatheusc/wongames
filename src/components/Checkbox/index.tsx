import * as S from './styles';

export type CheckboxProps = {
	label?: string;
	labelFor?: string;
	labelColor?: 'white' | 'black';
};

export default function Checkbox({ label, labelFor = '', labelColor = 'white' }: CheckboxProps) {
	return (
		<S.Wrapper>
            <S.Input id={labelFor} type="checkbox" />
			{ !!label && <S.Label htmlFor={labelFor} labelColor={labelColor}>{label}</S.Label> }
		</S.Wrapper>
	);
};