import { AppProps} from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from 'hooks/use-cart';

import { useApollo } from 'utils/apollo';

import Global from 'styles/global';
import theme from 'styles/theme';

export default function App({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<CartProvider>
					<Head>
						<title>Won Games</title>
						<link rel="shortcut icon" href="/img/icon-512.png" />
						<link rel="apple-touch-icon" href="/img/icon-512.png" />
						<link rel="manifest" href="/manifest.json"/>

						<meta name="description" content="The Best Game Store in the World" />
					</Head>

					<Global />

					<Component {...pageProps} />
				</CartProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}