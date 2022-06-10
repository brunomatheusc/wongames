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

	it('should sign in and sign out', () => {
		cy.visit('/sign-in');
		cy.signIn();

		cy.url().should('eq', `${Cypress.config().baseUrl}/`);

		cy.findByText('cypress').should('exist').click();
		cy.findByText(/sign out/i).click();

		cy.findByText('cypress').should('not.exist');
		cy.findByRole('link', { name: /sign in/i }).should('exist');
	});

	it.only('should sign the user and redirect to the page that it was defined', () => {
		cy.visit('/profile/me');

		cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`);

		cy.signIn();

		cy.url().should('eq', `${Cypress.config().baseUrl}/profile/me`);
		cy.findByLabelText(/username/i).should('have.value', 'cypress');
		cy.findByLabelText(/e-mail/i).should('have.value', 'e2e@wongames.com');
	});
});