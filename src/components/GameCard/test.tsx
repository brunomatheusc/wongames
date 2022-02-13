import { fireEvent, render, screen } from '@testing-library/react';
import theme from 'styles/theme';
import { renderWithTheme } from 'utils/test/helpers';

import GameCard from '.';

const props = {
	id: '1',
	title: 'Population Zero',
	slug: 'population-zero',
	developer: 'Rockstar Games',
	img: 'https://source.unsplash.com/user/willianjusten/300x140',
	price: 235
};

describe('<GameCard />', () => {
	it('should render the GameCard', () => {
		renderWithTheme(<GameCard { ...props }/>);

		expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();

		expect(screen.getByRole('heading', { name: props.developer })).toBeInTheDocument();

		expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', props.img);

		expect(screen.getByRole('link', { name: props.title})).toHaveAttribute('href', `/game/${props.slug}`);

		expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
	});

	it('should render price in label', () => {
		renderWithTheme(<GameCard { ...props} />);

		const price = screen.getByText(props.price);

		expect(price).not.toHaveStyle({ textDecoration: 'line-through' });
		expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary });
	});

	it('should render a line-through in price when promotional', () => {
		renderWithTheme(<GameCard { ...props} promotionalPrice={15} />);

		const price = screen.getByText(props.price);
		expect(price).toHaveStyle({ textDecoration: 'line-through' });
		expect(screen.getByText('R$ 15,00')).not.toHaveStyle({ textDecoration: 'line-through' });
	});

	it('should render a filled Favorite icon when favorite is true', () => {
		renderWithTheme(<GameCard { ...props} favorite />);

		expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument();
	});


	it('should call onFav method when favorite is clicked', () => {
		const onFav = jest.fn();
		renderWithTheme(<GameCard { ...props} favorite onFav={onFav} />);

		fireEvent.click(screen.getAllByRole('button')[0]);

		expect(onFav).toBeCalled();
	});
});