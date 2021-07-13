import { render, screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import FormSignUp from '.';

describe('<FormSignUp />', () => {
	it('should render the FormSignUp', () => {
		renderWithTheme(<FormSignUp />);

		expect(screen.getByRole('heading', { name: /FormSignUp/i })).toBeInTheDocument();
	});
});