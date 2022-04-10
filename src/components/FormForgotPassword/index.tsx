import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { CheckCircleOutline, Email, ErrorOutline } from '@styled-icons/material-outlined';

import { FieldErrors, forgotValidate } from 'utils/validations';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormWrapper, FormLoading, FormError, FormSuccess } from 'components/Form';

export default function FormForgotPassword() {
	const { query } = useRouter();

	const [success, setSuccess] = useState(false);
	const [formError, setFormError] = useState('');
	const [fieldError, setFieldError] = useState<FieldErrors>({});
	const [values, setValues] = useState({ email: (query.email as string) || '' });
	const [loading, setLoading] = useState(false);

	function handleInput(field: string, value: string) {
		setValues((s) => ({ ...s, [field]: value }));
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setLoading(true);

		const errors = forgotValidate(values);

		if (Object.keys(errors).length) {
			setFieldError(errors);
			setLoading(false);

			return;
		}

		setFieldError({});

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

		const data = await response.json();
		setLoading(false);

		if (data.error) {
			setFormError(data.message[0].messages[0].message);
			return false;
		}

		setSuccess(true);
	}

	return (
		<FormWrapper>
		{ success ? (
			<FormSuccess>
				<CheckCircleOutline />
				You just received an email!
			</FormSuccess>
		) : (
			<>
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
					initialValue={query.email as string}
					type="email"
					icon={<Email />}
					error={fieldError?.email}
					onInputChange={(v) => handleInput('email', v!)}
				/>

				<Button type="submit" size="large" fullWidth disabled={loading}>
					{ loading ? <FormLoading /> : <span>Send email</span>}
				</Button>
			</form>
			</>
		)}
		</FormWrapper>
	);
};