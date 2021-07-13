import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import { FormLink, FormWrapper } from '.';

describe('<Form />', () => {
	it('should render the Form', () => {
		const { container } = renderWithTheme(
			<FormWrapper>
				<FormLink>
					My nice <a href="#">link</a>
				</FormLink>
			</FormWrapper>
		);

		expect(container.parentElement).toMatchInlineSnapshot();
	});
});