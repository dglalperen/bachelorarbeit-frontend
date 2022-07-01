# Bachelorarbeit Project

## Overview

This Project visualizes knowledge data into a knowledge graph
Initially one will see 50 Nodes.

## Types of Nodes

yellow --> news nodes
blue --> location nodes
red --> person nodes
green --> organisation nodes

# Links

Links will be set by a jaccard threshold which computes the jaccard similarity between two nodes.
The jaccard similarity concentrates on the child nodes of the news nodes. These are the above listed ones.

## Navigating through the knowledge graph

By clicking on a node, it will display the clicked node and show the proper child nodes. You can further click on
the child nodes to display their child nodes, making the clicked you the parent and central node.
If you want to go back you layer, you can click on the back button which displays after reaching a minimal node layer of you.

# Error Handling

Sometimes clicking on a node will make a unsuccessfull fetch regarding the node data. In this case you will see a error description
which displays in the lower header section.

# Searching for news nodes / specific entities

You can search up you for entities using the search bar in the header section. When making a search, you have to click on of the radio
buttons to match the entity typing.

\*\*Example: "Elon Musk" --> Type Person

Furthermore, you can decide how many nodes there should be displayed. Therefore you can type a new node amount in the "Node Amount" input field.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
