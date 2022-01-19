import { useEffect, useState } from 'react';
import _ from 'lodash';
import { ParsedUrlQueryInput } from 'querystring';
import { Close, FilterList } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Heading from 'components/Heading';
import Radio from 'components/Radio';

import * as S from './styles';

export type ItemProps = {
	title: string;
	name: string;
	type: 'checkbox' | 'radio';
	fields: Field[];
}

type Field = {
	label: string;
	name: string;
}

type Values = ParsedUrlQueryInput;

export type ExploreSidebarProps = {
	items: ItemProps[];
	initialValues?: Values;
	onFilter: (values: Values) => void;
}

export default function ExploreSidebar({ items, initialValues = {}, onFilter }: ExploreSidebarProps) {
	const [values, setValues] = useState(initialValues);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		onFilter(values);
	}, [values]);

	function handleFilterMenu() {
		setIsOpen(false);
	}

	function handleRadio(name: string, value: boolean | string) {
		setValues((s) => ({...s, [name]: value}));
	}

	function handleCheckbox(name: string, value: string) {
		const currentList = (values[name] as []) || [];
		setValues((s) => ({ ...s, [name]: _.xor(currentList, [value])}));
	}

	return (
		<S.Wrapper isOpen={isOpen}>
			<S.Overlay aria-hidden={isOpen} />

			<S.IconWrapper>
				<FilterList aria-label="open filters" onClick={() => setIsOpen(true) } />
				<Close aria-label="close filters" onClick={() => setIsOpen(false)} />
			</S.IconWrapper>

			<S.Content>
			{ items.map((item) => (
				<S.Items key={item.name}>
					<Heading lineBottom lineColor="secondary" size="small">{item.title}</Heading>

					{item.type === 'checkbox' && (
						item.fields.map((field) =>
						<Checkbox
							key={field.name}
							name={field.name}
							label={field.label}
							labelFor={field.name}
							isChecked={!!(values[item.name] as string[])?.includes(field.name)}
							onCheck={() => handleCheckbox(item.name, field.name)}
						/>)
					)}

					{item.type === 'radio' && (
						item.fields.map((field) =>
							<Radio
								key={field.name}
								id={field.name}
								name={item.name}
								label={field.label}
								labelFor={field.name}
								value={field.name}
								defaultChecked={String(field.name) === String(values[item.name])}
								onChange={() => handleRadio(item.name, field.name)}
							/>)
					)}
				</S.Items>
			))}
			</S.Content>

			<S.Footer>
				<Button fullWidth size="medium" onClick={handleFilterMenu}>Filter</Button>
			</S.Footer>
		</S.Wrapper>
	);
};