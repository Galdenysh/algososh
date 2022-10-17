/// <reference types="cypress" />
// @ts-check

describe("string page", () => {
  before(() => {
    cy.visit("/algososh/recursion");
  });

  it("check button if input empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");

    cy.get("input").type("test").should("have.value", "test");
    cy.contains("Развернуть").should("be.enabled");
  });

  it("check recursion", () => {
    cy.clock();
    cy.reload();
    cy.get("input").type("test").should("have.value", "test");
    cy.contains("Развернуть").click();
    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("t");
      if (index === 1) cy.wrap(item).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("e");
      if (index === 2) cy.wrap(item).should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("s");
      if (index === 3) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("t");
    });

    cy.tick(1000);

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("t");
      if (index === 1) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("e");
      if (index === 2) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").contains("s");
      if (index === 3) cy.wrap(item).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("t");
    });

    cy.tick(1000);

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("t");
      if (index === 1) cy.wrap(item).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("s");
      if (index === 2) cy.wrap(item).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("e");
      if (index === 3) cy.wrap(item).should("have.css", "border", "4px solid rgb(127, 224, 81)").contains("t");
    });
  });
});
