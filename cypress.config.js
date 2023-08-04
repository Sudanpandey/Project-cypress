const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "hp712v",
  viewportWidth: 1440,
  viewportHeight: 900,
  // retries: {
  //   runMode: 2,
  //   openMode: 1,
  // },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    defaultCommandTimeout: 15000,
    requestTimeout: 10000,
    experimentalStudio: true,
    testIsolation: false,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
  experimentalWebKitSupport: true
});
