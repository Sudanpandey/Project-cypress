# Cypress Test Suite for Project XYZ

This repository contains end-to-end tests for Project XYZ using the Cypress testing framework.

## Getting Started

These instructions will help you set up and run the tests on your local machine.

### Prerequisites

- Node.js and npm should be installed on your machine.


### Installation

1. Clone this repository:

2. Navigate to the Cypress project directory: `cd tests/Cypress`

3. Install the required dependencies:`npm install` and `npx cypress install` Install Cypress locally (if not already installed):

4. Execute the following command   `cp .env.example .env`

5. Fill the required credentials in .env 

6. To run the Cypress tests, use the following command:

`node ./node_modules/cypress/bin/cypress open`

## Test Structure
cypress/e2e: This directory contains the test scripts organized by feature or scenario.

## Configuration
cypress.json: Cypress configuration file. You can modify settings like baseUrl, viewport size, etc.

## Custom Commands
cypress/support/commands.js: Custom commands and utilities to use across test scripts.

