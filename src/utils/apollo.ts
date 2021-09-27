import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState = {}) {
	// Verificar se já existe uma instância
	const apolloClientGlobal = apolloClient ?? createApolloClient();

	if (initialState) {
		apolloClientGlobal.cache.restore(initialState);
	}

	// Inicializar no SSR com cache limpo
	if (typeof window === 'undefined') {
		return apolloClientGlobal;
	}

	apolloClient = apolloClient ?? apolloClientGlobal;

	return apolloClient;
}

export function useApollo(initialState = {}) {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);

	return store;
}