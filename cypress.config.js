const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'p1w6hy',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
		reporter: "mochawesome",
		reporterOptions: {
			reportDir: "cypress/report/mochawesome-report",
			overwrite: true,
			html: true,
			json: false,
			timestamp: "mmddyyyy_HHMMss"
		}
  },
});


