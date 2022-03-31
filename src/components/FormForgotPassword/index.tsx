import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/client';

import { Email, ErrorOutline } from '@styled-icons/material-outlined';

import { FieldErrors } from 'utils/validations';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormWrapper, FormLoading, FormError } from 'components/Form';

import * as S from './styles';

export default function FormForgotPassword() {
	const { push, query } = useRouter();

	const [formError, setFormError] = useState('');
	const [fieldError, setFieldError] = useState<FieldErrors>({});
	const [values, setValues] = useState({ email: '' });
	const [loading, setLoading] = useState(false);

	function handleInput(field: string, value: string) {
		setValues((s) => ({ ...s, [field]: value }));
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setLoading(true);

		const errors = {};

		if (Object.keys(errors).length) {
			setFieldError(errors);
			setLoading(false);

			return;
		}

		setFieldError({});

		const result = await signIn('credentials', {
			...values,
			redirect: false,
			callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
		});

		if (result?.url) {
			push(result.url);
		}

		setLoading(false);

		console.error('Email ou senha inválida');

		setFormError('username or password is invalid');
	}

	return (
		<FormWrapper>
			{!!formError && (
				<FormError>
					<ErrorOutline />
					{formError}
				</FormError>
			)}

            <form onSubmit={handleSubmit}>
				<TextField
					name="email"
					placeholder="Email"
					type="email"
					icon={<Email />}
					error={fieldError?.email}
					onInputChange={(v) => handleInput('email', v!)}
				/>

				<Button type="submit" size="large" fullWidth disabled={loading}>
					{ loading ? <FormLoading /> : <span>Send email</span>}
				</Button>
			</form>
		</FormWrapper>
	);
};