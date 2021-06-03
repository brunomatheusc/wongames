import { ThemeProvider } from 'styled-components';
import Global from 'styles/global';
import theme from 'styles/theme';

// export const parameters = {
// 	actions: { argTypesRegex: "^on[A-Z].*" },
// 	controls: {
// 		matchers: {
// 			color: /(background|color)$/i,
// 			date: /Date$/,
// 		},
// 	},
// }

export const parameters = {
	backgrounds: {
		default: 'won-light',
		values: [
			{
				name: 'won-light',
				value: theme.colors.white,
			},
			{
				name: 'won-dark',
				value: theme.colors.mainBg,
			}
		]
	}
};

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Global removeBg />
			<Story />
		</ThemeProvider>
	)
];