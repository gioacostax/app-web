/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Container: <BasicDemo />', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
    cy.get('.menu>a')
      .eq(0)
      .click();
  });

  it('Should display a button with the text "0 Likes<ThumbsUp />"', () => {
    cy.get('#r-app')
      .find('button')
      .should('have.text', '0 Likes');
  });

  it('Should click the button and update the text to "1 Likes<ThumbsUp />"', () => {
    cy.get('#r-app')
      .find('button')
      .click();

    cy.get('#r-app')
      .find('button')
      .should('have.text', '1 Likes');
  });
});
