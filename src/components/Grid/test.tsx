import { render, screen } from '@testing-library/react';

import Grid from '.';

describe('<Grid />', () => {
	it('should render the Grid', () => {
		const { container } = render(<Grid />);

		expect(screen.getByRole('heading', { name: /Grid/i })).toBeInTheDocument();
	});
});