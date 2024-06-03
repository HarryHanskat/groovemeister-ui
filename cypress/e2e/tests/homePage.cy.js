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
        cy.get(selectors.practiceItemsList.listAllPracticeItems).should('have.length.at.least', 2)
        cy.get(selectors.practiceItemsList.headerPracticeItems).should('have.text', 'Practice Items List')
        cy.get(selectors.practiceItemsList.buttonRemoveAllPracticeItems).should('be.visible')
    })

    it('displays details of a practice item when one is clicked', () => {
        cy.get(selectors.practiceItemsList.listAllPracticeItems).eq(0).should('be.visible').click()
        
        cy.get(selectors.selectedPracticeItem.labelDescription).should('be.visible')
        cy.get(selectors.selectedPracticeItem.labelDuration).should('have.text', 'Duration (minutes):')
        cy.get(selectors.selectedPracticeItem.labelFrequency).should('not.be.NaN')
        cy.get(selectors.selectedPracticeItem.labelTopic).parent().should('contain.text', 'Fundamentals')
        cy.get(selectors.selectedPracticeItem.labelType).parent().should('contain.text', 'Type:')
        cy.get(selectors.selectedPracticeItem.labelSourceLink).should('be.visible')
    })

    it('displays which practice item is selected', () => {
        cy.get(selectors.practiceItemsList.listAllPracticeItems).eq(0)
        .should('be.visible').click()
        .should('have.class', 'active')
        .should('have.css', 'background-color')
    })


})