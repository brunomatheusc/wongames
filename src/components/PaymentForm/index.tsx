import { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { ShoppingCart, ErrorOutline } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import Heading from 'components/Heading';

import * as S from './styles';

export default function PaymentForm() {
	const [error, setError] = useState<string | null>(null);
	const [disabled, setDisabled] = useState<boolean>(true);

	async function handleChange(event: StripeCardElementChangeEvent) {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	}

	return (
		<S.Wrapper>
            <S.Body>
				<Heading color="black" size="small" lineBottom>Payment</Heading>

				<CardElement
					options={{
						hidePostalCode: true,
						style: {
							base: {
								fontSize: '16px',
							}
						}
					}}
					onChange={handleChange}
				/>

				{ error && (
					<S.Error>
						<ErrorOutline size={20} />
						{error}
					</S.Error>
				)}
			</S.Body>

			<S.Footer>
				<Button as="a" fullWidth minimal>Continue shopping</Button>
				<Button fullWidth icon={<ShoppingCart />} disabled={disabled || !!error}>Buy now</Button>
			</S.Footer>
		</S.Wrapper>
	);
};