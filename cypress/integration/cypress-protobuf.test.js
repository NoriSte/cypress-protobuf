/// <reference types="Cypress" />

context('Tests', () => {
  it('The fixture encoding should work', () => {
    // go to the baseUrl page (see cypress.json)
    cy.visit('/')

    // start the server to allow requests interception
    cy.server();

    // read the fixture
    cy.fixture("example.json")
    .then(json => {
      // then encode it
      cy.task("protobufEncode", {
        // pass the fixture content
        fixtureBody: json,
        // specify the protobuf message name
        message: "Example",
        // load the same .proto file used by the client
        protoFilePath: "./public/example.proto",
      })
      .then(encodedJson => {
        // then create a route with the encoded fixture
        cy.route({
          headers: {
            "content-type": "application/octet-stream"
          },
          response: encodedJson,
          url: '/protobuf-message'
        }).as("example");
      });

      cy.get("button").click();
      cy.wait("@example");
      cy.get("#response").contains(`"Message": "Hello from the Cypress Protobuf plugin"`);
    });
  })

  it('The fixture encoding should work with a previously read proto file', () => {
    cy.task("protobufEncode", {
      protoFilePath: "./public/example.proto",
    })

    // go to the baseUrl page (see cypress.json)
    cy.visit('/')

    // start the server to allow requests interception
    cy.server();

    // read the fixture
    cy.fixture("example.json")
    .then(json => {
      // then encode it
      cy.task("protobufEncode", {
        // pass the fixture content
        fixtureBody: json,
        // specify the protobuf message name
        message: "Example"
      })
      .then(encodedJson => {
        // then create a route with the encoded fixture
        cy.route({
          headers: {
            "content-type": "application/octet-stream"
          },
          response: encodedJson,
          url: '/protobuf-message'
        }).as("example");
      });

      cy.get("button").click();
      cy.wait("@example");
      cy.get("#response").contains(`"Message": "Hello from the Cypress Protobuf plugin"`);
    });
  })
})
