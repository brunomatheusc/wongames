import { gql, QueryHookOptions, useQuery } from '@apollo/client';

export const QUERY_PROFILE_ME = gql`
	query QueryProfileMe($identifier: ID!) {
		user(id: $identifier) {
			id
			email
			username
		}
	}
`;