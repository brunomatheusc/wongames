import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/client';

import { Lock, ErrorOutline } from '@styled-icons/material-outlined';

import { FieldErrors, resetValidate } from 'utils/validations';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormWrapper, FormLoading, FormError } from 'components/Form';

import * as S from './styles';

export default function FormResetPassword() {
	const { query } = useRouter();

	const [formError, setFormError] = useState('');
	const [fieldError, setFieldError] = useState<FieldErrors>({});
	const [values, setValues] = useState({ password: '', confirm_password: '' });
	const [loading, setLoading] = useState(false);

	function handleInput(field: string, value: string) {
		setValues((s) => ({ ...s, [field]: value }));
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setLoading(true);

		const errors = resetValidate(values);

		if (Object.keys(errors).length) {
			setFieldError(errors);
			setLoading(false);

			return;
		}

		setFieldError({});

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password: values.password,
				passwordConfirmation: values.confirm_password,
				code: query.code,
			}),
		});

		const data = await response.json();

		if (data.error) {
			setFormError(data.message[0].messages[0].message);
			setLoading(false);

			return false;
		}

		console.log("Success", data);
		await signIn('credentials', {
			email: data.user.email,
			password: values.password,
			callbackUrl: '/'
		})
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
					error={fieldError?.password}
					name="password"
					placeholder="Password"
					type="password"
					onInputChange={(v) => handleInput('password', v!)}
					icon={<Lock />}
				/>

				<TextField
					error={fieldError?.confirm_password}
					name="confirm_password"
					placeholder="Confirm password"
					type="password"
					onInputChange={(v) => handleInput('confirm_password', v!)}
					icon={<Lock />}
				/>

				<Button type="submit" size="large" fullWidth disabled={loading}>
					{ loading ? <FormLoading /> : <span>Reset password</span>}
				</Button>
			</form>
		</FormWrapper>
	);
};