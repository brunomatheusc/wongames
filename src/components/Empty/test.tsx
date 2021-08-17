import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import Empty, { EmptyProps } from '.';

const props: EmptyProps = {
	title: 'A simple title',
	description: 'A simple description'
};

describe('<Empty />', () => {
	it('should render the Empty', () => {
		renderWithTheme(<Empty {...props} hasLink />);

		expect(screen.getByRole('image', { name: /a gamer in a couch playing videogame/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
		expect(screen.getByText(props.description)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /go back to store/i })).toHaveAttribute('href', '/');
	});

	it('should not render link when haslink is not passed', () => {
		renderWithTheme(<Empty {...props} />);

		expect(screen.queryByRole('link', { name: /go back to store/i })).not.toBeInTheDocument();
	});
});