/// <reference types="cypress" />
// @ts-check

describe("stack page", () => {
  before(() => {
    cy.visit("/algososh/stack");
  });

  it("check button if input empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").should("be.disabled");

    cy.get("input").type("test").should("have.value", "test");
    cy.contains("Добавить").should("be.enabled");
  });

  it("check add elements in the stack", () => {
    cy.clock();
    cy.reload();

    // step 1
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]")
      .should("have.length", "1")
      .last()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("t");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("0");

    cy.tick(500);

    cy.get("[class^=circle_circle]")
      .should("have.length", "1")
      .last()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("t");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("0");

    // step 2
    cy.get("input").type("e").should("have.value", "e");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]")
      .should("have.length", "2")
      .last()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("e");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("1");

    cy.tick(500);

    cy.get("[class^=circle_circle]")
      .should("have.length", "2")
      .last()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("e");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("1");

    // step 3
    cy.get("input").type("s").should("have.value", "s");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]")
      .should("have.length", "3")
      .last()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("s");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("2");

    cy.tick(500);

    cy.get("[class^=circle_circle]")
      .should("have.length", "3")
      .last()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("s");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("2");

    // step 4
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]")
      .should("have.length", "4")
      .last()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("t");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("3");

    cy.tick(500);

    cy.get("[class^=circle_circle]")
      .should("have.length", "4")
      .last()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("t");
    cy.get("[class*=circle_head]").last().contains("top");
    cy.get("[class*=circle_index]").last().contains("3");
  });

  it("check delete elements in the stack", () => {
    cy.reload();
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("input").type("e").should("have.value", "e");
    cy.contains("Добавить").click();
    cy.get("input").type("s").should("have.value", "s");
    cy.contains("Добавить").click();
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();

    cy.get("[class^=circle_circle]")
      .should("have.length", "4")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("t");
        if (index === 1) cy.wrap(item).contains("e");
        if (index === 2) cy.wrap(item).contains("s");
        if (index === 3) cy.wrap(item).contains("t");
      });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]")
      .should("have.length", "3")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("t");
        if (index === 1) cy.wrap(item).contains("e");
        if (index === 2) cy.wrap(item).contains("s");
      });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]")
      .should("have.length", "2")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("t");
        if (index === 1) cy.wrap(item).contains("e");
      });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]")
      .should("have.length", "1")
      .each((item, index) => {
        if (index === 0) cy.wrap(item).contains("t");
      });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]").should("have.length", "0");
  });

  it("check clear button", () => {
    cy.reload();
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("input").type("e").should("have.value", "e");
    cy.contains("Добавить").click();
    cy.get("input").type("s").should("have.value", "s");
    cy.contains("Добавить").click();
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();

    cy.get("[class^=circle_circle]").should("have.length", "4");
    cy.contains("Отчистить").click();
    cy.get("[class^=circle_circle]").should("have.length", "0");
  });
});
