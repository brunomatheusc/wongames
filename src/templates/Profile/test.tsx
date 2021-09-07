import { render, screen } from '@testing-library/react';

import Profile from '.';

describe('<Profile />', () => {
	it('should render the Profile', () => {
		const { container } = render(<Profile />);

		expect(screen.getByRole('heading', { name: /Profile/i })).toBeInTheDocument();
	});
});