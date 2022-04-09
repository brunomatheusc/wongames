import Link from 'next/link';

import Button from 'components/Button';
import Heading from 'components/Heading';
import TextField from 'components/TextField';

import * as S from './styles';

export type FormProfileProps = {
	username?: string;
	email?: string;
};

export default function FormProfile({ username, email }: FormProfileProps) {
	return (
		<S.Wrapper>
            <Heading lineBottom color="black" size="small">My Profile</Heading>

			<S.Form>
				<TextField
					name="name"
					placeholder="Username"
					label="Username"
					initialValue={username}
				/>

				<TextField
					name="email"
					type="email"
					placeholder="E-mail"
					label="E-mail"
					initialValue={email}
					disabled
				/>

				<S.ButtonContainer>
					<Link href={`/forgot-password?email=${email}`} passHref>
						<Button minimal size="medium" as="a">Reset Password</Button>
					</Link>

					<Button size="medium">Save</Button>
				</S.ButtonContainer>
			</S.Form>
		</S.Wrapper>
	);
};