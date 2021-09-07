import Button from 'components/Button';
import Heading from 'components/Heading';
import TextField from 'components/TextField';
import * as S from './styles';

export default function FormProfile() {
	return (
		<S.Wrapper>
            <Heading lineBottom color="black" size="small">My Profile</Heading>

			<S.Form>
				<TextField name="name" placeholder="Name" label="Name" initialValue="John Doe" />
				<TextField name="email" type="email" placeholder="E-mail" label="E-mail" initialValue="johndoe@gmail.com" disabled />

				<TextField name="password" type="password" placeholder="Type your password" label="Password" />
				<TextField name="new-password" type="password" placeholder="New password" label="New password" />

				<Button size="large">Save</Button>
			</S.Form>
		</S.Wrapper>
	);
};