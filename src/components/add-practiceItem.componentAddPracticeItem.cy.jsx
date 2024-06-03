import React from 'react'
import AddPracticeItem from './add-practiceItem.component'

describe('<AddPracticeItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddPracticeItem />)
  })
})