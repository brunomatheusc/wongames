import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from 'utils/test-utils';

import FormSignUp from '.';

describe('<FormSignUp />', () => {
	it('should render the FormSignUp', () => {
		render(
			<MockedProvider>
				<FormSignUp />
			</MockedProvider>
		);

		expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
	});
});