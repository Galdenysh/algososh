/// <reference types="cypress" />
// @ts-check

describe("fibonacci page", () => {
  before(() => {
    cy.visit("/algososh/fibonacci");
  });

  it("check button if input empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Рассчитать").should("be.disabled");

    cy.get("input").type("5").should("have.value", "5");
    cy.contains("Рассчитать").should("be.enabled");
  });

  it("check fibonacci", () => {
    cy.clock();
    cy.reload();
    cy.get("input").type("5").should("have.value", "5");
    cy.contains("Рассчитать").click();
    cy.get("[class^=circle_circle]").should("have.length", "1").last().contains("0");
    cy.tick(500);
    cy.get("[class^=circle_circle]").should("have.length", "2").last().contains("1");
    cy.tick(500);
    cy.get("[class^=circle_circle]").should("have.length", "3").last().contains("1");
    cy.tick(500);
    cy.get("[class^=circle_circle]").should("have.length", "4").last().contains("2");
    cy.tick(500);
    cy.get("[class^=circle_circle]").should("have.length", "5").last().contains("3");
    cy.tick(500);
    cy.get("[class^=circle_circle]").should("have.length", "6").last().contains("5");
  });
});
