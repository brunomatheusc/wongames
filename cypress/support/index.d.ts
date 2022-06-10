/// <reference types="cypress" />

type ShowcaseAttributes = {
	name: string;
	highlight?: boolean;
};

type FieldsAttributes = {
	label: string;
	name: string;
};

type User = {
	username: string;
	email: string;
	password: string;
};

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to visit google page
         * @example cy.google()
		*/
		google(): Chainable<Cypress.AUTWindow | null>;

        /**
         * Custom command to get element by data-cy values
         * @example cy.getByDataCy('selector')
		*/
		getByDataCy(selector: string): Chainable<Element>;

		/**
		 * Custom command to get fields by label
		 * @example cy.getFields(attrs: FieldsAttributes)
		*/
		getFields(label: FieldsAttributes[]): Chainable<Element>;

        /**
         * Custom command to check banner in page
         * @example cy.shouldRenderBanner()
		*/
		shouldRenderBanner(): Chainable<Element>;

		/**
		 * Custom command to check showcase in page
		 * @example cy.shouldRenderShowcase(attrs: ShowcaseAttributes)
		*/
		shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>;

		/**
		 * Custom command to check if value is less or greater than price
		 * @example cy.getFields(attrs: FieldsAttributes)
		*/
		shouldBeLessOrGreater(value: number, type: 'greater' | 'less'): Chainable<Element>;

		/**
		 * Custom command to crate new user
		 * @example cy.signUp({ username: 'Cypress e2e', email: 'e2e@wongames.com', password: '123456'})
		*/
		signUp(user: User): Chainable<Element>;
    }
}