# Cypress Protocol Buffers
Encode a fixture with Protocol Buffers

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![Cypress Protobuf](assets/cy-protobuf.jpg)

Use this plugin to encode a [Cypress](https://www.cypress.io) fixture with [Protocol Buffers](https://developers.google.com/protocol-buffers/).

# Installation
```bash
npm i -D cypress-protobuf
# or
yarn add -D cypress-protobuf
```

then open your `cypress/plugins/index.js` file and register a new task
```javascript
module.exports = on => {
  on("task", {
    protobufEncode: require("cypress-protobuf"),
  });
};
```

# How to use it
To encode with Protocol Buffers a fixture
```javascript
cy.fixture("FIXTURE_NAME.json")
  .then(json => {
    cy.task("protobufEncode", {
      fixtureBody: json, // the fixture body
      message: "MESSAGE_NAME", // the protobuf message to use
      protoFilePath: "./public/example.proto", // the path (starting from your project directory) to the .profo file
    })
  .then(encodedJson => {
    // 🎉 `encodedJson` contains the encoded fixture
    cy.route({
      headers: {
        "content-type": "application/octet-stream"
      },
      response: encodedJson,
      url: 'API_URL'
    }).as("FIXTURE_NAME");
  });
});
```

and in your test you will wait for the request as usual
```javascript
cy.wait("@YOUR_FIXTURE_NAME");
```

Take a look at the [example test](cypress/integration/cypress-protobuf.test.js) source code.

# Tips
- the plugin saves the last `protoFilePath` so you can avoid to pass it every time. You can even set it at the beginning of your test suite
```javascript
before(() => {
  cy.task("protobufEncode", {
    protoFilePath: "./public/escrow/ui.proto"
  });
});
```
