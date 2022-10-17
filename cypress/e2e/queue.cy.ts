/// <reference types="cypress" />
// @ts-check

describe("stack page", () => {
  before(() => {
    cy.visit("/algososh/queue");
  });

  it("check button if input empty", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").should("be.disabled");

    cy.get("input").type("test").should("have.value", "test");
    cy.contains("Добавить").should("be.enabled");
  });

  it("check add elements in the queue", () => {
    cy.clock();
    cy.reload();

    // step 1
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").should("have.value", "");
    });
    cy.tick(500);
    cy.get("[class^=circle_content").each((item, index) => {
      if (index === 0) {
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("t");
          cy.get("[class*=circle_head]").contains("head");
          cy.get("[class*=circle_tail]").contains("tail");
        });
      }
    });

    // step 2
    cy.get("input").type("e").should("have.value", "e");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 1) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").should("have.value", "");
    });
    cy.tick(500);
    cy.get("[class^=circle_content").each((item, index) => {
      if (index === 1) {
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("e");
          cy.get("[class*=circle_head]").should("have.value", "");
          cy.get("[class*=circle_tail]").contains("tail");
        });
      }
    });

    // step 3
    cy.get("input").type("s").should("have.value", "s");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 2) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").should("have.value", "");
    });
    cy.tick(500);
    cy.get("[class^=circle_content").each((item, index) => {
      if (index === 2) {
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("s");
          cy.get("[class*=circle_head]").should("have.value", "");
          cy.get("[class*=circle_tail]").contains("tail");
        });
      }
    });

    // step 4
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 3) cy.wrap(item).should("have.css", "border", "4px solid rgb(210, 82, 225)").should("have.value", "");
    });
    cy.tick(500);
    cy.get("[class^=circle_content").each((item, index) => {
      if (index === 3) {
        cy.wrap(item).within(() => {
          cy.get("[class^=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)").contains("t");
          cy.get("[class*=circle_head]").should("have.value", "");
          cy.get("[class*=circle_tail]").contains("tail");
        });
      }
    });
  });

  it("check delete elements in the queue", () => {
    cy.reload();
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("input").should("have.value", "").type("e").should("have.value", "e");
    cy.contains("Добавить").click();
    cy.get("input").should("have.value", "").type("s").should("have.value", "s");
    cy.contains("Добавить").click();
    cy.get("input").should("have.value", "").type("t").should("have.value", "t");
    cy.contains("Добавить").click();

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).contains("t");
      if (index === 1) cy.wrap(item).contains("e");
      if (index === 2) cy.wrap(item).contains("s");
      if (index === 3) cy.wrap(item).contains("t");
    });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.value", "");
      if (index === 1) cy.wrap(item).contains("e");
      if (index === 2) cy.wrap(item).contains("s");
      if (index === 3) cy.wrap(item).contains("t");
    });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.value", "");
      if (index === 1) cy.wrap(item).should("have.value", "");
      if (index === 2) cy.wrap(item).contains("s");
      if (index === 3) cy.wrap(item).contains("t");
    });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.value", "");
      if (index === 1) cy.wrap(item).should("have.value", "");
      if (index === 2) cy.wrap(item).should("have.value", "");
      if (index === 3) cy.wrap(item).contains("t");
    });

    cy.contains("Удалить").click();

    cy.get("[class^=circle_circle]").each((item, index) => {
      if (index === 0) cy.wrap(item).should("have.value", "");
      if (index === 1) cy.wrap(item).should("have.value", "");
      if (index === 2) cy.wrap(item).should("have.value", "");
      if (index === 3) cy.wrap(item).should("have.value", "");
    });
  });

  it("check clear button", () => {
    cy.reload();
    cy.get("input").type("t").should("have.value", "t");
    cy.contains("Добавить").click();
    cy.get("input").should("have.value", "").type("e").should("have.value", "e");
    cy.contains("Добавить").click();
    cy.get("input").should("have.value", "").type("s").should("have.value", "s");
    cy.contains("Добавить").click();
    cy.get("input").should("have.value", "").type("t").should("have.value", "t");
    cy.contains("Добавить").click();

    cy.contains("Отчистить").click();
    cy.get("[class*=circle_letter]").each((item) => {
      cy.wrap(item).should("have.value", "");
    });
  });
});
