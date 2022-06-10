/// <reference path="../support/index.d.ts" />

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://www.google.com'));

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
	return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('shouldRenderBanner', () => {
	cy.get('.slick-slider').within(() => {
		cy.findByRole('heading', { name: /cyberpunk 2077/i });
		cy.findByRole('link', { name: /buy now/i });

		cy.get('.slick-dots > :nth-child(2) > button').click();
		cy.wait(500);

		cy.findByRole('heading', { name: 'Mafia II' });
		cy.findByRole('link', { name: /buy now/i });
	});
});

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false}) => {
	cy.getByDataCy(name).within(() => {
		cy.findByRole('heading', { name }).should('exist');

		cy.getByDataCy("highlight").should(highlight ? 'exist' : 'not.exist');

		if (highlight) {
			cy.getByDataCy("highlight").within(() => {
				cy.findByRole('link').should('have.attr', 'href');
			});
		}

		cy.getByDataCy("game-card").should('have.length.gt', 0);
	});
});

Cypress.Commands.add('getFields', (fields) => {
	fields.map(({ label }) => cy.findByText(label).should('exist'));
});

Cypress.Commands.add('shouldBeLessOrGreater', (value, type) => {
	cy
		.findByText(/^\$\d+(\.\d{1,2})?/)
		.invoke('text')
		.then($el => $el.replace('$', ''))
		.then(parseFloat)
		.should(`be.${type === 'less' ? 'lt' : 'gt'}`, value);
});

Cypress.Commands.add('signUp', ({ username, password, email }) => {
	cy.findByPlaceholderText(/username/i).type(username);
	cy.findByPlaceholderText(/email/i).type(email);
	cy.findByPlaceholderText(/^password/i).type(password);
	cy.findByPlaceholderText(/confirm password/i).type(password);
	cy.findByRole('button', { name: /sign up now/i }).click();
});

Cypress.Commands.add('signIn', (email = 'e2e@wongames.com', password = '123456') => {
	// cy.url().should('eq', `${Cypress.config().baseUrl}/`);
	cy.findByPlaceholderText(/email/i).type(email);
	cy.findByPlaceholderText(/^password/i).type(password);
	cy.findByRole('button', { name: /sign in now/i }).click();
});