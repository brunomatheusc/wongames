/// <reference path="../support/index.d.ts" />

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://www.google.com'));

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