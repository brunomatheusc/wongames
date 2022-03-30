import { FormEvent, useState } from 'react';

import { signIn } from 'next-auth/client';
import Link from 'next/link';

import { useMutation } from '@apollo/client';

import { AccountCircle, Email, Lock, ErrorOutline } from '@styled-icons/material-outlined';

import { FieldErrors, signUpValidate } from 'utils/validations';
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import { MUTATION_REGISTER } from 'graphql/mutations/register';

import Button from 'components/Button';
import TextField from 'components/TextField';

import * as S from 'components/Form';

export default function FormSignUp() {
	const [values, setValues] = useState<UsersPermissionsRegisterInput>({
		username: '',
		email: '',
		password: ''
	});

	const [formError, setFormError] = useState<string>('');
	const [fieldError, setFieldError] = useState<FieldErrors>({});

	const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
		onError: (err) => setFormError(err.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0].message),
		onCompleted: () => {
			!error &&
			signIn('credentials', {
				email: values.email,
				password: values.password,
				callbackUrl: '/'
			});
		}
	});

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const errors = signUpValidate(values);

		if (Object.keys(errors).length) {
			setFieldError(errors);

			return;
		}

		setFieldError({});

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
			{!!formError && (
				<S.FormError>
					<ErrorOutline />
					{formError}
				</S.FormError>
			)}

            <form onSubmit={handleSubmit}>
				<TextField error={fieldError?.username} name="username" placeholder="Username" type="text" onInputChange={(v) => handleInput('username', v!)} icon={<AccountCircle />} />
				<TextField error={fieldError?.email} name="email" placeholder="Email" type="email" onInputChange={(v) => handleInput('email', v!)} icon={<Email />} />
				<TextField error={fieldError?.password} name="password" placeholder="Password" type="password" onInputChange={(v) => handleInput('password', v!)} icon={<Lock />} />
				<TextField error={fieldError?.confirm_password} name="confirm_password" placeholder="Confirm password" type="password" onInputChange={(v) => handleInput('confirm_password', v!)} icon={<Lock />} />

				<Button size="large" type="submit" fullWidth disabled={loading}>
					{ loading ? <S.FormLoading /> : <span>Sign up now</span>}
				</Button>

				<S.FormLink>
					Already have an account? <Link href="/sign-in"><a>Sign in</a></Link>
				</S.FormLink>
			</form>
		</S.FormWrapper>
	);
};