import { render, screen } from '@testing-library/react';

import Button from '.';

describe('<Button />', () => {
	it('should render the Button', () => {
		const { container } = render(<Button />);

		expect(screen.getByRole('Button', { name: /Button/i })).toBeInTheDocument();

		expect(container.firstChild).toMatchSnapshot();
	});
});