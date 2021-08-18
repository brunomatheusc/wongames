import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import GameItem, { GameItemProps } from '.';

const props: GameItemProps = {
	img: 'https://source.unsplash.com/user/willianjusten/151x70',
	title: 'Red Dead Redemption 2',
	price: 'R$ 215,00',
}

describe('<GameItem />', () => {
	it('should render the GameItem', () => {
		renderWithTheme(<GameItem {...props} />);

		expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
		expect(screen.getByRole('img')).toHaveAttribute('src', props.img);
		expect(screen.getByText(props.price)).toBeInTheDocument();
	});

	it('should render the item with download link', () => {
		const downloadLink = 'https://link';

		renderWithTheme(<GameItem {...props} downloadLink={downloadLink} />);

		expect(screen.getByRole('link', { name: `Get ${props.title} here`})).toHaveAttribute('href', downloadLink);
	});
});