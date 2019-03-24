# Cypress Protocol Buffers
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
Encode a fixture with Protocol Buffers

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.com/NoriSte/cypress-protobuf.svg?branch=master)](https://travis-ci.com/NoriSte/cypress-protobuf)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)


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
cy.fixture("FIXTURE_NAME.json+")
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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/NoriSte"><img src="https://avatars0.githubusercontent.com/u/173663?v=4" width="100px;" alt="Stefano Magni"/><br /><sub><b>Stefano Magni</b></sub></a><br /><a href="https://github.com/NoriSte/cypress-protobuf/commits?author=NoriSte" title="Code">💻</a> <a href="https://github.com/NoriSte/cypress-protobuf/commits?author=NoriSte" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!