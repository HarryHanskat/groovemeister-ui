
/* 
Just trying out different approaches to organizing selectors to see if there's some 
extra flexibility while maintaining reliability by doing something besides a POM (page object model)

Idea here being that all of the selectors are organized by their corresponding react component.
*/

export const selectors = {
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
        listAllPracticeItems: '[data-cy="list-practiceItemsList"] li',
        itemActivePracticeItem: '[data-cy="listItem*active"]',
        buttonRemoveAllPracticeItems: '[data-cy="buttonRemoveAll-practiceItemsList"]'
    } ,
    selectedPracticeItem: {
        labelDescription: '[data-cy="labelDescription-selectedPracticeItem"]',
        labelDuration: '[data-cy="labelDuration-selectedPracticeItem"]',
        labelFrequency: '[data-cy="labelFrequency-selectedPracticeItem"]',
        labelTopic: '[data-cy="labelTopic-selectedPracticeItem"]',
        labelType: '[data-cy="labelType-selectedPracticeItem"]',
        labelSourceLink: '[data-cy="labelSourceLink-selectedPracticeItem"]',
        linkEdit: '[data-cy="linkEdit-selectedPracticeItem"]'
    },
    editPracticeItem: {
        inputDescription: '[data-cy="inputDescription-editPracticeItem"]',
        inputDuration: '[data-cy="inputDuration-editPracticeItem"]',
        inputFrequency: '[data-cy="inputFrequency-editPracticeItem"]',
        inputSourceLink: '[data-cy="inputSourceLink-editPracticeItem"]',
        inputTopic: '[data-cy="inputTopic-editPracticeItem"]',
        inputType: '[data-cy="inputType-editPracticeItem"]',
        buttonDelete: '[data-cy="buttonDelete-editPracticeItem"]',
        buttonUpdate: '[data-cy="buttonSubmit-editPracticeItem"]',
    }
}
