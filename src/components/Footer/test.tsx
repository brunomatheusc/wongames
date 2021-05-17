import { render, screen } from '@testing-library/react';

import Footer from '.';

describe('<Footer />', () => {
	it('should render the Footer', () => {
		const { container } = render(<Footer />);

		expect(screen.getByRole('Footer', { name: /Footer/i })).toBeInTheDocument();

		expect(container.firstChild).toMatchSnapshot();
	});
});