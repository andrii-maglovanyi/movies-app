describe("Movies", () => {
  it("Should manage movies list", () => {
    cy.visit("/");
    cy.server();
    cy.route("https://api.themoviedb.org/3/search/movie**").as("search");

    cy.findAllByTestId("movie")
      .get("h4")
      .should(($properties) => {
        let texts = $properties.map((_, el) => {
          return Cypress.$(el).text();
        });

        texts = texts.get();

        expect(texts).to.have.length(20);
        expect(texts).to.deep.eq([
          "Ad Astra",
          "Artemis Fowl",
          "Lost Bullet",
          "Sonic the Hedgehog",
          "Parasite",
          "The Invisible Man",
          "The Gentlemen",
          "Irresistible",
          "Joker",
          "Feel the Beat",
          "Avengers: Infinity War",
          "Force of Nature",
          "Harry Potter and the Philosopher's Stone",
          "Britt-Marie Was Here",
          "7500",
          "Aladdin",
          "Wasp Network",
          "1917",
          "Onward",
          "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)",
        ]);
      });

    cy.get("section").should("have.length", 20);
    cy.scrollTo("bottom");
    cy.get("section").should("have.length", 40);
    cy.scrollTo("top");

    cy.get("header").contains("Watch later").click();

    cy.get("h2").contains("Watch later");
    cy.contains("No movies in this list.");
    cy.get("header").contains("Back").click();

    cy.get("section").eq(2).contains("Watch later").click();
    cy.get("section").eq(2).contains("In list");
    cy.get("section")
      .eq(2)
      .find("h4")
      .then(($h4) => {
        const txt = $h4.text();

        cy.get("header").contains("Watch later").click();
        cy.get("section").should("have.length", 1);
        cy.get("section h4").should(($title) => {
          expect($title.text()).to.eq(txt);
        });
      });

    cy.get("header").contains("Back").click();
    cy.scrollTo("bottom");

    cy.get("section").eq(0).contains("Watch later").click();
    cy.get("section").eq(0).contains("In list");
    cy.get("section").eq(4).contains("Watch later").click({ force: true });
    cy.get("section").eq(4).contains("In list");
    cy.get("section").eq(6).contains("Watch later").click({ force: true });
    cy.get("section").eq(6).contains("In list");

    cy.get("header").contains("Watch later").click();
    cy.url().should("include", "/lists/watch-later");
    cy.get("section").should("have.length", 4);
    cy.get("header").contains("Back").click();

    cy.url().should("eq", "http://localhost:3000/");

    cy.get("header").contains("Liked movies");

    cy.get("section").eq(0).contains("In list").click({ force: true });
    cy.get("section").eq(0).contains("Watch later");
    cy.get("section").eq(6).contains("In list").click({ force: true });
    cy.get("section").eq(6).contains("Watch later");

    cy.get("header").contains("Watch later").click();
    cy.url().should("include", "/lists/watch-later");
    cy.get("section").should("have.length", 2);
    cy.get("header").contains("Back").click();

    cy.url().should("eq", "http://localhost:3000/");

    cy.get("header").contains("Liked movies").click();

    cy.get("h2").contains("Favorites");
    cy.contains("No movies in this list.");
    cy.get("header").contains("Back").click();

    cy.get("input:first")
      .should("have.attr", "placeholder", "Search movies...")
      .type("the avengers");

    cy.findAllByTestId("movies-list").contains("No movies found.");

    cy.get("@search").then(() => {
      cy.get("section").eq(0).contains("h4", "The Avengers");
      cy.get("section").should("have.length", 20);

      cy.get("section").eq(1).contains("Like").click({ force: true });
      cy.get("section").eq(1).contains("Liked");
      cy.get("section").eq(10).contains("Like").click({ force: true });
      cy.get("section").eq(10).contains("Liked");
      cy.get("section").eq(12).contains("Like").click({ force: true });
      cy.get("section").eq(12).contains("Liked");

      cy.get("section")
        .eq(1)
        .find("h4")
        .then(($h4) => {
          const txt = $h4.text();

          cy.get("header").contains("Liked movies").click();
          cy.get("section").should("have.length", 3);
          cy.get("section")
            .first()
            .find("h4")
            .should(($title) => {
              expect($title.text()).to.eq(txt);
            });

          cy.get("header").contains("Back").click();
        });

      cy.get("input:first")
        .should("have.attr", "placeholder", "Search movies...")
        .type("terminator");

      cy.findAllByTestId("movies-list").contains("No movies found.");
      cy.get("@search").then(() => {
        cy.get("section").first().contains("h4", "Terminator: Dark Fate");
        cy.get("section").eq(1).contains("h4", "Terminator Genisys");
      });
    });
  });
});
