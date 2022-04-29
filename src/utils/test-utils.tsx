import { ReactElement } from "react";
import { render, RenderOptions } from '@testing-library/react';

import { ThemeProvider } from "styled-components";
import theme from 'styles/theme';

import { CartContext, CartContextDefaultValues, CartContextData } from 'hooks/use-cart';
import { WishlistContext, WishlistContextDefaultValues, WishlistContextData } from 'hooks/use-wishlist';

type CustomRenderProps = {
	cartProviderProps?: CartContextData;
	wishlistProviderProps?: WishlistContextData;
} & Omit<RenderOptions, 'queries'>;

const customRender = (ui: ReactElement, {
	cartProviderProps = CartContextDefaultValues,
	wishlistProviderProps = WishlistContextDefaultValues,
	...renderOptions
}: CustomRenderProps = {}) => {
	return render(
		<ThemeProvider theme={theme}>
			<CartContext.Provider value={cartProviderProps}>
				<WishlistContext.Provider value={wishlistProviderProps}>
					{ ui }
				</WishlistContext.Provider>
			</CartContext.Provider>
		</ThemeProvider>
	)
};

export * from '@testing-library/react';
export { customRender as render };