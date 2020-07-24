/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Container: <BasicDemo />', () => {
  it('Should url /#/ and show a button with the text "0 Likes"', () => {
    cy.visit('http://localhost:5000/#/');
    cy.get('#r-app')
      .find('button')
      .should('have.text', '0 Likes');
  });

  it('Should url /#/mobx and show a title with the text "MobX Demo"', () => {
    cy.visit('http://localhost:5000/#/mobx');
    cy.get('.container')
      .find('h2')
      .should('have.text', 'MobX Demo');
  });

  it('Should url /#/mobx and show a title with the text "Redux Demo"', () => {
    cy.visit('http://localhost:5000/#/redux');
    cy.get('.container')
      .find('h2')
      .should('have.text', 'Redux Demo');
  });
});
