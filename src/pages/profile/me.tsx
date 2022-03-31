import React from 'react'
import { GetServerSidePropsContext } from 'next';

import Profile from 'templates/Profile'
import FormProfile, { FormProfileProps } from 'components/FormProfile'

import { QueryProfileMe } from 'graphql/generated/QueryProfileMe';
import { QUERY_PROFILE_ME } from 'graphql/queries/profile';

import { initializeApollo } from 'utils/apollo';
import protectedRoutes from 'utils/protected-routes';

export default function ProfileMe(props: FormProfileProps) {
	return (
		<Profile>
			<FormProfile {...props} />
		</Profile>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await protectedRoutes(context);
	const apolloClient = initializeApollo(null, session);

	const { data } = await apolloClient.query<QueryProfileMe>({
		query: QUERY_PROFILE_ME
	});

	console.log({ data });

	const { me } = data;

	return {
		props: {
			session,
			username: me?.username,
			email: me?.email,
		},
	};
}
