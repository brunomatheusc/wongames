/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
	before(() => {
		cy.visit('/game/cyberpunk_2077');

	});

	it('should render game page sections', () => {
		cy.wait(10000);

		cy.getByDataCy('game-info').within(() => {
			cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
			cy.findByText(/Cyberpunk 2077 is an open-world/i).should('exist');
			cy.findByText('$159.89').should('exist');
			cy.findByText(/add to cart/i).should('exist');
		});

		// gallery
		cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0);

		// content
		cy.getByDataCy('text-content').within(() => {
			cy.findByRole('heading', { name: /description/i });
		});

		cy.getByDataCy('text-content').children().should('have.length.at.least', 2);

		// Details
		cy.getByDataCy('game-details').within(() => {
			cy.findByRole('heading', { name: /game details/i }).should('exist');
			cy.findByRole('heading', { name: /developer/i }).should('exist');
			cy.findByRole('heading', { name: /release date/i }).should('exist');
			cy.findByRole('heading', { name: /platforms/i }).should('exist');
			cy.findByRole('heading', { name: /publisher/i }).should('exist');
			cy.findByRole('heading', { name: /rating/i }).should('exist');
			// cy.findByRole('heading', { name: /genres/i }).should('exist');

			cy.findAllByText(/cd projekt red/i).should('exist');
			cy.findByText(/dec 8, 2020/i).should('exist');
			cy.findByRole('img', { name: /windows/i }).should('exist');
			cy.findByText(/free/i).should('exist');
			// cy.findByText('Role-playing / Action / Sci-fi').should('exist');
		});

		cy.shouldRenderShowcase({ name: 'Upcoming Games', highlight: true });
		cy.shouldRenderShowcase({ name: 'You may like these games', highlight: false });
	});

	it('should add/remove game to cart', () => {
		cy.getByDataCy('game-info').within(() => {
			cy.findByRole('button', { name: /add to cart/i }).click();
			cy.findByRole('button', { name: /remove from cart/i }).should('exist');
		});

		cy.findAllByLabelText(/cart items/i).first().should('have.text', 1).click();

		cy.getByDataCy('cart-list').within(() => {
			cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
		});

		cy.findAllByLabelText(/cart items/i).first().click();

		cy.getByDataCy('game-info').within(() => {
			cy.findByRole('button', { name: /remove from cart/i }).click();
			cy.findByRole('button', { name: /add to cart/i }).should('exist');
		});

		cy.findAllByLabelText(/cart items/i).should('not.exist');
	});
});