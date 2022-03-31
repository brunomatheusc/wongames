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

				<TextField name="password" type="password" placeholder="Type your password" label="Password" />
				<TextField name="new-password" type="password" placeholder="New password" label="New password" />

				<Button size="large">Save</Button>
			</S.Form>
		</S.Wrapper>
	);
};