/// <reference path="../support/index.d.ts" />

import { createUser } from '../support/generate';

describe('User', () => {
	it('should sign up', () => {
		const { username, email, password } = createUser();
		cy.visit('/sign-up');

		cy.signUp({ username, email, password });

		cy.url().should('eq', `${Cypress.config().baseUrl}/`);
		cy.findByText(username).should('exist');
	});
});