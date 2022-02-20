import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import { MUTATION_REGISTER } from 'graphql/mutations/register';

import * as S from 'components/Form';

export default function FormSignUp() {
	const [values, setValues] = useState<UsersPermissionsRegisterInput>({
		username: '',
		email: '',
		password: ''
	});

	const [createUser] = useMutation(MUTATION_REGISTER);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		createUser({
			variables: {
				input: {
					username: values.username,
					email: values.email,
					password: values.password,
				}
			}
		});
	}

	function handleInput(field: string, value: string) {
		setValues((s) => ({ ...s, [field]: value }));
	}

	return (
		<S.FormWrapper>
            <form onSubmit={handleSubmit}>
				<TextField name="username" placeholder="Username" type="text" onInputChange={(v) => handleInput('username', v!)} icon={<AccountCircle />} />
				<TextField name="email" placeholder="Email" type="email" onInputChange={(v) => handleInput('email', v!)} icon={<Email />} />
				<TextField name="password" placeholder="Password" type="password" onInputChange={(v) => handleInput('password', v!)} icon={<Lock />} />
				<TextField name="confirm-password" placeholder="Confirm password" type="password" onInputChange={(v) => handleInput('confirm-password', v!)} icon={<Lock />} />

				<Button size="large" type="submit" fullWidth>Sign up now</Button>

				<S.FormLink>
					Already have an account? <Link href="/sign-in"><a>Sign in</a></Link>
				</S.FormLink>
			</form>
		</S.FormWrapper>
	);
};