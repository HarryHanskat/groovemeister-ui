/// <reference types="cypress" />

import { selectors } from '../../support/selectors.js';

describe('homepage', () => {

    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    it('displays a nav bar with link to practice items and add', () => {
        cy.get(selectors.nav.navBar).should('be.visible')
        cy.get(selectors.nav.navLinkPracticeItems).should('be.visible')
        cy.get(selectors.nav.navLinkAddItems).should('be.visible')
    })

    it('displays a search bar', () => {
        cy.get(selectors.search.textBoxSearch).should('be.visible')
        cy.get(selectors.search.buttonSearch).should('be.visible')
    })

    it('displays a list of practice items', () => {
        cy.get(selectors.practiceItemsList.listAllPracticeItems).should('have.length.at.least', 1)
        cy.get(selectors.practiceItemsList.headerPracticeItems).should('have.text', 'Practice Items List')
        cy.get(selectors.practiceItemsList.buttonRemoveAllPracticeItems).should('be.visible')
    })

})