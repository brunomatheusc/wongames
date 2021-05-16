import { render, screen } from '@testing-library/react';
import { renderWithTheme } from '../../utils/test/helpers';

import Button from '.';

describe('<Button />', () => {
	it('should render the medium size Button by default', () => {
		// const { container } = render(<Button />);

		// expect(screen.getByRole('Button', { name: /Button/i })).toBeInTheDocument();

		// expect(container.firstChild).toMatchSnapshot();

		renderWithTheme(<Button>Buy now</Button>);

		expect(screen.getByRole('button', { name: /Buy now/i})).toHaveStyle({
			height: '4rem',
			padding: '0.8rem 3.2rem',
			'font-size': '1.4rem'
		});
	});

	it('should render the small size Button by default', () => {
		renderWithTheme(<Button size="small">Buy now</Button>);

		expect(screen.getByRole('button', { name: /Buy now/i})).toHaveStyle({
			height: '3rem',
			'font-size': '1.2rem'
		});
	});

	it('should render the large size Button by default', () => {
		renderWithTheme(<Button size="large">Buy now</Button>);

		expect(screen.getByRole('button', { name: /Buy now/i})).toHaveStyle({
			height: '5rem',
			padding: '0.8rem 4.8rem',
			'font-size': '1.6rem'
		});
	});

	it('should render a full width version Button', () => {
		renderWithTheme(<Button fullWidth>Buy now</Button>);

		expect(screen.getByRole('button', { name: /Buy now/i})).toHaveStyle({
			width: '100%'
		});
	});
});