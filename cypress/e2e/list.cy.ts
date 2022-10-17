/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
// @ts-check

describe("list page", () => {
  before(() => {
    cy.visit("/algososh/list");
  });

  it("check button if input empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");

    cy.get("input").each((item) => {
      cy.wrap(item).type("1").should("have.value", "1");
    });
    cy.contains("Добавить в head").should("be.enabled");
    cy.contains("Добавить в tail").should("be.enabled");
    cy.contains("Добавить по индексу").should("be.enabled");
    cy.contains("Удалить по индексу").should("be.enabled");
  });

  it("check default list", () => {
    cy.reload();
    cy.get("[class^=circle_content]").each((item, index) => {
      if (index === 0)
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("0");
          cy.get("[class*=circle_head]").contains("head");
          cy.get("[class*=circle_index]").contains("0");
          cy.get("[class*=circle_tail]").should("have.value", "");
        });

      if (index === 1)
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("34");
          cy.get("[class*=circle_head]").should("have.value", "");
          cy.get("[class*=circle_index]").contains("1");
          cy.get("[class*=circle_tail]").should("have.value", "");
        });

      if (index === 2)
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("8");
          cy.get("[class*=circle_head]").should("have.value", "");
          cy.get("[class*=circle_index]").contains("2");
          cy.get("[class*=circle_tail]").should("have.value", "");
        });

      if (index === 3)
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("1");
          cy.get("[class*=circle_head]").should("have.value", "");
          cy.get("[class*=circle_index]").contains("3");
          cy.get("[class*=circle_tail]").contains("tail");
        });
    });
  });

  it("check add in the head", () => {
    cy.reload();
    cy.get("input").each((item, index) => {
      if (index === 0) cy.wrap(item).type("1").should("have.value", "1");
    });
    cy.contains("Добавить в head").click();
    cy.wait(500);
    cy.get("[class^=circle_circle]").should("have.length", "5").first().contains("1");
  });

  it("check add in the tail", () => {
    cy.reload();
    cy.get("input").each((item, index) => {
      if (index === 0) cy.wrap(item).type("1").should("have.value", "1");
    });
    cy.contains("Добавить в tail").click();
    cy.wait(500);
    cy.get("[class^=circle_circle]").should("have.length", "5").last().contains("1");
  });

  it("check add to index", () => {
    cy.reload();
    cy.get("input").each((item, index) => {
      if (index === 0) cy.wrap(item).type("1").should("have.value", "1");
      if (index === 1) cy.wrap(item).type("1").should("have.value", "1");
    });
    cy.contains("Добавить по индексу").click();
    cy.wait(1000);
    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 1) cy.wrap(item).contains("1");
    });
  });

  it("check delete in the head", () => {
    cy.reload();
    cy.contains("Удалить из head").click();
    cy.wait(1000);
    cy.get("[class^=circle_circle]")
      .should("have.length", "3")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("34");
        if (index === 1) cy.wrap(item).contains("8");
        if (index === 2) cy.wrap(item).contains("1");
      });
  });

  it("check delete in the tail", () => {
    cy.reload();
    cy.contains("Удалить из tail").click();
    cy.wait(1000);
    cy.get("[class^=circle_circle]")
      .should("have.length", "3")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("0");
        if (index === 1) cy.wrap(item).contains("34");
        if (index === 2) cy.wrap(item).contains("8");
      });
  });

  it("check delete to index", () => {
    cy.reload();
    cy.get("input").each((item, index) => {
      if (index === 1) cy.wrap(item).type("1").should("have.value", "1");
    });
    cy.contains("Удалить по индексу").click();
    cy.wait(1500);
    cy.get("[class^=circle_circle]")
      .should("have.length", "3")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("0");
        if (index === 1) cy.wrap(item).contains("8");
        if (index === 2) cy.wrap(item).contains("1");
      });
  });
});
