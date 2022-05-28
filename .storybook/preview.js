import '../.jest/next-image.mock';
import { ThemeProvider } from 'styled-components';
import { CartContext, CartContexDefaultValues } from 'hooks/use-cart';
import Global from 'styles/global';
import theme from 'styles/theme';

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
			<CartContext.Provider value={{
				...CartContexDefaultValues,
				...CartContexDefaultValues(context?.args?.cartContextValue || {}),
				...context.args,
			}}>
				<Global removeBg />
				<Story />
			</CartContext.Provider>
		</ThemeProvider>
	)
];