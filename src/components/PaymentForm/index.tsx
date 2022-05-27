import { FormEvent, useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js';

import { ShoppingCart, ErrorOutline } from '@styled-icons/material-outlined';

import { useCart } from 'hooks/use-cart';
import { createPayment, createPaymentIntent } from 'utils/stripe/methods';

import Button from 'components/Button';
import Heading from 'components/Heading';
import { FormLoading } from 'components/Form';

import * as S from './styles';

type PaymentFormProps = {
	session: Session;
};

export default function PaymentForm({ session }: PaymentFormProps) {
	const { items, clearCart } = useCart();
	const { push } = useRouter();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);
	const [clientSecret, setClientSecret] = useState<string>('');
	const [freeGames, setFreeGames] = useState<boolean>(false);

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		async function setPaymentMode() {
			if (items.length) {
				const data = await createPaymentIntent({ items, token: session.jwt as string });

				if (data.freeGames) {
					setFreeGames(true);

					return;
				}

				if (data.error) {
					setError(data.error);

					return;
				}

				setFreeGames(false);
				setClientSecret(data.client_secret);
			}
		}

		setPaymentMode();
	}, [items]);

	async function handleChange(event: StripeCardElementChangeEvent) {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		setLoading(true);

		if (freeGames) {
			await saveOrder();
		} else {
			const payload = await stripe!.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements!.getElement(CardElement)!,
				}
			});

			if (payload.error){
				setError(`Payment failed ${payload.error.message}`);
				setLoading(false);

				return;
			}

			await saveOrder(payload.paymentIntent);
		}

		push('/success');

		clearCart();
		setError(null);
		setLoading(false);
	}

	async function saveOrder(paymentIntent?: PaymentIntent) {
		const data = await createPayment({ items, paymentIntent, token: session.jwt as string });

		return data;
	}

	return (
		<S.Wrapper>
			<form onSubmit={handleSubmit}>
				<S.Body>
					<Heading color="black" size="small" lineBottom>Payment</Heading>

				{ freeGames ? (
					<S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
				) : (
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
				)}

				{ error && (
					<S.Error>
						<ErrorOutline size={20} />
						{error}
					</S.Error>
				)}
				</S.Body>

				<S.Footer>
					<Button as="a" fullWidth minimal>Continue shopping</Button>
					<Button
						fullWidth
						icon={loading ? <FormLoading /> : <ShoppingCart />}
						disabled={!freeGames && (disabled || !!error)}
					>
						{ !loading && <span>Buy now</span> }
					</Button>
				</S.Footer>
			</form>
		</S.Wrapper>
	);
};