import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import Highlight from '.';
import * as S from './styles';

const props = {
	title: 'Heading 1',
	subtitle: 'Heading 2',
	backgroundImage: '/img/red-dead-img.jpg',
	buttonLabel: 'Buy now',
	buttonLink: '/rdr2',
}

describe('<Highlight />', () => {
	it('should render headings and button', () => {
		renderWithTheme(<Highlight { ...props }/>);

		expect(screen.getByRole('heading', { name: /Heading 1/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Heading 2/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument();
	});

	it('should render background image', () => {
		const { container } = renderWithTheme(<Highlight { ...props }/>);

		expect(container.firstChild).toHaveStyle({ backgroundImage: `url(${props.backgroundImage})`})
	});

	it('should render float image', () => {
		renderWithTheme(<Highlight { ...props } floatImage="/float-image.png"/>);

		expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', '/float-image.png');
	});

	it('should render align right by default', () => {
		const { container } = renderWithTheme(<Highlight { ...props } floatImage="/float-image.png" />);

		expect(container.firstChild).toHaveStyleRule('grid-template-areas', "'floatImage content'");
		expect(container.firstChild).toHaveStyleRule('text-align', 'right', { modifier: `${S.Content}`});
	});

	it('should render align left', () => {
		const { container } = renderWithTheme(<Highlight { ...props } floatImage="/float-image.png" alignment="left" />);

		expect(container.firstChild).toHaveStyleRule('grid-template-areas', "'content floatImage'");
		expect(container.firstChild).toHaveStyleRule('text-align', 'left', { modifier: `${S.Content}`});
	});
});