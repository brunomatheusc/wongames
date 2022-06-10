/// <reference path="../support/index.d.ts" />

describe('Reset Password', () => {
	it('should show error if password does not match', () => {
		cy.visit('/reset-password?code=123456734');

		cy.findAllByPlaceholderText(/^password/i).type('1234');
		cy.findAllByPlaceholderText(/confirm password/i).type('4321');
		cy.findByRole('button', { name: /reset password/i }).click();

		cy.findByText(/confirm password does not match with password/i).should('exist');
	});

	it('should show error if code is not valid', () => {
		cy.visit('/reset-password?code=123456734');

		cy.findAllByPlaceholderText(/^password/i).type('1234');
		cy.findAllByPlaceholderText(/confirm password/i).type('1234');
		cy.findByRole('button', { name: /reset password/i }).click();

		cy.findByText(/Incorrect code provided/i).should('exist');
	});


	it.only('should fill the input and redirect to the home page', () => {
		cy.intercept('POST', '**/auth/reset-password', {
			statusCode: 200,
			body: { user: { email: 'cypress@email.com' }}
		});

		cy.intercept('POST', '**/auth/callback/credentials*', {
			statusCode: 200,
			body: { user: { email: 'cypress@email.com' }}
		});

		cy.intercept('POST', '**/auth/callback/credentials*', {
			statusCode: 200,
			body: { user: { email: 'cypress@email.com' }}
		});

		cy.intercept('GET', '**/auth/session*', {
			statusCode: 200,
			body: { user: { name: 'cypress', email: 'cypress@email.com' }}
		});

		cy.visit('/reset-password?code=valid_token');

		cy.findAllByPlaceholderText(/^password/i).type('1234');
		cy.findAllByPlaceholderText(/confirm password/i).type('1234');
		cy.findByRole('button', { name: /reset password/i }).click();

		cy.url().should('eq', `${Cypress.config().baseUrl}/`);
		cy.findByText(/cypress/i).should('exist');
	});
});