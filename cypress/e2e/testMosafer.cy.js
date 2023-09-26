/// <reference types= "cypress" />


Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
Cypress.Commands.add("randomPage", () => {
  let lang = [
    "https://global.almosafer.com/en?",
    "https://global.almosafer.com/ar?",
  ];
  let randomIndex = Math.floor(Math.random() * lang.length);
  cy.visit(lang[randomIndex]);
  cy.get(".cta__saudi").click();
});

describe("almosafer test cases", () => {
  let date = new Date();
  let today = date.getDate();
  let excpectedDepartureDate = today + 1;
  let excpectedReturnDate = today + 2;
  
  
  it.skip("choose language randomly", () => {
    cy.randomPage();
  });

  it.skip("check if the price is in SAR", () => {
    cy.randomPage();
    cy.get('[data-testid="Header__CurrencySelector"]')
      .invoke("text")
      .should("include", "SAR");
  });

  it.skip("check the departure and the return dates", () => {
    cy.randomPage();
    cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-eSePXt')
      .invoke("text")
      .then((ele) => {
        expect(excpectedDepartureDate).to.eql(parseInt(ele.trim()));
      });
  });

  it("check the price (low - high)", () => {
    cy.randomPage();
    cy.get("#uncontrolled-tab-example-tab-hotels").click();
    let cityEn=['dubai','cairo']
    let randomCityEn= Math.floor(Math.random()*cityEn.length)
    
    cy.get('[data-testid="AutoCompleteInput"]').type(cityEn[randomCityEn]);
    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
    cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()

    cy.get('.Price__Value').first().invoke('text').then(parseInt).then((firstElement)=>{
      cy.get('.Price__Value').last().invoke('text').then(parseInt).then((lastElement)=>{
        expect(firstElement).to.be.lessThan(lastElement)
      })
    })



  })

})