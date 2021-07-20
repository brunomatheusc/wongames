import { screen } from '@testing-library/react';
import theme from 'styles/theme';
import { renderWithTheme } from 'utils/test/helpers';

import TextContent from '.';

const props = {
	title: 'Description',
	content: `<h1>Content</h1>`
}

describe('<TextContent />', () => {
	it('should render title and content', () => {
		renderWithTheme(<TextContent {...props} />);

		expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /content/i })).toBeInTheDocument();
	});

	it('should render without title', () => {
		renderWithTheme(<TextContent content={props.content} />);

		expect(screen.queryByRole('heading', { name: props.title })).not.toBeInTheDocument();
	});

	it('should render the heading', () => {
		renderWithTheme(<TextContent {...props} />);

		const wrapper = screen.getByRole('heading', { name: props.title }).parentElement;

		expect(wrapper).toHaveStyle({ color: theme.colors.white });
		expect(wrapper).toHaveStyleRule('color', theme.colors.black, { media: '(min-width: 768px)'});
	});
});