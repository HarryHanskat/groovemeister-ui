
/* 
Just trying out different approaches to organizing selectors to see if there's some 
extra flexibility while maintaining reliability by doing something besides a POM (page object model)
*/

const selectors = {
    nav: {
        navBar: '[data-cy="navbar"]',
        navLinkPracticeItems: '[data-cy="navLink-PracticeItems"]',
        navLinkAddItems: '[data-cy="navLink-AddItems"]',
    },
    search: {
        textBoxSearch: '[data-cy="textBox-search"]',
        buttonSearch: '[data-cy="button-search"]'
    },
    practiceItemsList: {
        headerPracticeItems: '[data-cy="header-practiceItemsList"]',
        listAllPracticeItems: '[data-cy="list-practiceItemsList"]',
        itemActivePracticeItem: '[data-cy="listItem*active"]',
        buttonRemoveAllPracticeItems: '[data-cy="buttonRemoveAll-practiceItemsList"]'
    }
}

// class Selectors {

//     // Locators
    
//     /* Navbar */
//     get navBar() { return cy.get('[data-cy="navbar"]'); }
//     get navLinkPracticeItems() { return cy.get('[data-cy="navLinkPracticeItems"]'); }
//     get navLinkAddItems() { return cy.get('[data-cy="navLinkAddItems"]'); }

//     /* Search Bar */
//     get searchField() { return cy.get('')}
// }