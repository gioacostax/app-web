/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Container: <ReduxDemo />', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
    cy.get('.menu>a')
      .eq(2)
      .click();
  });

  it('Should display a title with the text "Redux Demo"', () => {
    cy.get('.container')
      .find('h2')
      .should('have.text', 'Redux Demo');
  });

  it('Should display a button with the text "LOAD FACT"', () => {
    cy.get('.container')
      .find('button')
      .should('have.text', 'LOAD FACT');
  });

  it('Should display an empty div with the class="quote"', () => {
    cy.get('.container')
      .find('.quote')
      .should('have.class', 'quote')
      .and('be.empty');
  });

  it('Should display a label with the text "Count: 0 - API Status: Ready"', () => {
    cy.get('.container')
      .find('.msg')
      .should('have.text', 'Count: 0 - API Status: Ready');
  });

  it('Should click the button and update the text to "LOADING..."', () => {
    cy.get('.container')
      .find('button')
      .click();

    cy.get('.container')
      .find('button')
      .should('have.text', 'LOADING...');
  });

  it('Should click the button and load de fact with label text: "Count: 1 - API Status: Data loaded"', () => {
    cy.get('.container')
      .find('button')
      .click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);

    cy.get('.container')
      .find('.quote')
      .should('not.be.empty');

    cy.get('.container')
      .find('.msg')
      .should('have.text', 'Count: 1 - API Status: Data loaded');
  });
});
