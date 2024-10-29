describe('Items Page', () => {
  it('should load the items page', () => {
    cy.visit('http://localhost:3000/items');
    cy.contains('Items');
  });

  it('should add a new item', () => {
    cy.visit('http://localhost:3000/items');
    cy.contains('Add Item').click();
    cy.get('input[name="itemName"]').type('New Item');
    cy.get('input[name="unit"]').type('pcs');
    cy.get('input[name="price"]').type('5.00');
    cy.contains('Add Item').click();
    cy.contains('New Item');
  });

  it('should edit an item', () => {
    cy.visit('http://localhost:3000/items');
    cy.contains('Edit').click();
    cy.get('input[name="itemName"]').clear().type('Updated Item');
    cy.contains('Save').click();
    cy.contains('Updated Item');
  });

  it('should delete an item', () => {
    cy.visit('http://localhost:3000/items');
    cy.contains('Delete').click();
    cy.contains('There are no items to be viewed.');
  });
});