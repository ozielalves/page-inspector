<img src="src\assets\logo-navbar-oziel.svg" alt="logo" align="right">

# Page Inspector &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> A web page inspection application

This project aims to provide the user with a simplified interface for automating search for keywords (character strings) on websites, using REST APIs from a web crawling service.

The page allows the user to enter a keyword, with more than 3 characters, to be submitted to the crawling service.

After submitting, the API returns an ID for the submitted keyword that will be used to track the keyword crawling progress.

The project was developed using [React JS](https://pt-br.reactjs.org/) and deployed using [Firebase](https://firebase.google.com/). Besides React and Firebase, other technologies were employed, such as: [TypeScript](https://www.typescriptlang.org/), [Styled Components](https://styled-components.com/), [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/projects/enzyme/) with an [unofficial adapter for React 17](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17).

Link to demo: **[Page Inspector](https://page-inspector.web.app)**

<br>

## Getting started

Cloning the repository:

```bash
# Clone the repository
git clone git@github.com:ozielalves/page-inspector.git

# Go to repository root
cd page-inspector/
```

Runs the application on localhost: 3000.

<br>

### Setting up Development

Installing the necessary dependencies:

```bash
yarn install
```

Running the application:

```bash
yarn start
```

The following message will appear:

```bash
Compiled successfully!

You can now view page-inspector in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.2:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

If the development environment does not open automatically in your default browser, you can access it by typing the local environment, which was provided in the previous message, in your browser's navigation bar:

```bash
http://localhost:3000
```

<br>

### Deploying

After completing the development process, it is possible to deploy the application using any hosting service available. This project was deployed using Firebase.

Inatalling Firebase:

```bash
npm install -g firebase-tools
```

Login into your firebase account using a google account.

```bash
firebase login
```

Deploy:

```bash
firebase deploy --only hosting -m "Deploying the most stable version"
```

For more information see documentation

- [Firebase CLI](https://firebase.google.com/docs/cli?hl=pt-br#windows-npm)
- [Firebase Host](https://firebase.google.com/docs/hosting/quickstart)

## Development

### Built With

- React (17.0.1)
- Styled Components (5.2.1)
- Typescript (4.0.3)

### Tested With

- TS-Jest (26.4.1)
- Enzyme (3.11.0)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)

### Folder Structure

```bash
page-inspector
├───build
├───node_modules
├───public
└───src
    └───src
        ├───assets
        ├───components
        │   ├───ActionButton
        │   ├───CircularProgress
        │   ├───Footer
        │   ├───KeywordForm
        │   ├───Modal
        │   │   └───__tests__
        │   ├───Navbar
        │   └───Table
        │       ├───TableItem
        │       └───__tests__
        ├───db
        │   └───repositories
        ├───hooks
        ├───pages
        │   ├───Home
        │   └───Requests
        │       └───styles
        ├───routes
        ├───states
        │   └───__tests__
        └───styles
```

## Tests

### Setup

> Adapter (setupTests.ts)

```bash
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom/extend-expect";

configure({ adapter: new Adapter() });
```

### Running tests

```bash
$ yarn test
```
