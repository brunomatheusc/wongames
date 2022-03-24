import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Email, Lock } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormWrapper, FormLink, FormLoading } from 'components/Form';

import * as S from './styles';

export default function FormSignIn() {
	const { push } = useRouter();

	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);

	function handleInput(field: string, value: string) {
		setValues((s) => ({ ...s, [field]: value }));
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setLoading(true);

		try {
			const result = await signIn('credentials', {
				...values,
				redirect: false,
				callbackUrl: '/'
			});

			if (result?.url) {
				push(result.url);
			}

			setLoading(false);

			console.error('Email ou senha inválida');
		} catch (error) {
			console.log({error});
		}
	}

	return (
		<FormWrapper>
            <form onSubmit={handleSubmit}>
				<TextField name="email" placeholder="Email" type="email" icon={<Email />} onInputChange={(v) => handleInput('email', v!)} />
				<TextField name="password" placeholder="Password" type="password" icon={<Lock />} onInputChange={(v) => handleInput('password', v!)} />

				<S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

				<Button type="submit" size="large" fullWidth disabled={loading}>
					{ loading ? <FormLoading /> : <span>Sign in now</span>}
				</Button>

				<FormLink>
					Don't have an account? <Link href="/sign-up"><a>Sign up</a></Link>
				</FormLink>
			</form>
		</FormWrapper>
	);
};