/// <reference types="cypress" />
// @ts-check

describe("service is available", () => {
  it("should be available on localhost:3000", () => {
    cy.visit("/algososh");
  });
  it("should be available recursion", () => {
    cy.visit("/algososh/recursion");
  });
  it("should be available fibonacci", () => {
    cy.visit("/algososh/fibonacci");
  });
  it("should be available sorting", () => {
    cy.visit("/algososh/sorting");
  });
  it("should be available stack", () => {
    cy.visit("/algososh/stack");
  });
  it("should be available queue", () => {
    cy.visit("/algososh/queue");
  });
  it("should be available list", () => {
    cy.visit("/algososh/list");
  });
});
