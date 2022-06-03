/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
	it('should render game page sections', () => {
		cy.visit('/game/cyberpunk_2077');

		// cy.get('[data-cy="game-info"]', { timeout: 5000 });

		cy.wait(10000);

		cy.getByDataCy('game-info').within(() => {
			cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
			cy.findByText(/Cyberpunk 2077 is an open-world/i).should('exist');
			cy.findByText('$159.89').should('exist');
			cy.findByText(/add to cart/i).should('exist');
		});

		cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0);
	});
});