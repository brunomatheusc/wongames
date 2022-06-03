/// <reference path="../support/index.d.ts" />

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://www.google.com'));

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
	return cy.get(`[data-cy=${selector}]`, ...args);
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
	cy.getByDataCy(`"${name}"`).within(() => {
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