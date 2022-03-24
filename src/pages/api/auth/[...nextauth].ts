import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

interface GenericObject {
	[x: string]: string;
}

interface AuthorizeProps {
	email: string;
	password: string;
}

const options = {
	pages: {
		signIn: '/sign-in',
	},
	providers: [
		Providers.Credentials({
			name: 'Sign-in',
			credentials: {},
			async authorize({ email, password }: AuthorizeProps) {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
					{
						method: 'POST',
						body: new URLSearchParams({ identifier: email, password })
					}
				);

				const data = await response.json();

				if (data.user) {
					return { ...data.user, jwt: data.jwt };
				}

				return null;
			}
		})
	],
	callbacks: {
		session: async (session: GenericObject, user: GenericObject) => {
			session.jwt = user.jwt;
			session.id = user.id;

			return Promise.resolve(session);
		},

		jwt: async (token: GenericObject, user: GenericObject) => {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.username;
				token.jwt = user.jwt;
			}

			return Promise.resolve(token);
		}
	},
};

export default function Auth(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, options);
};