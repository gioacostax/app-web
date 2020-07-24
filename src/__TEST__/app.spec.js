/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Container: <>🤩</>', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
  });

  it('#r-app container should display 🤩"', () => {
    cy.get('#r-app')
      .should('have.text', '🤩');
  });
});
