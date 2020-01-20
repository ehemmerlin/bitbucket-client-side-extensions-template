Bitbucket Server [Client-side Extension](https://developer.atlassian.com/server/framework/clientside-extensions/) template powered by JavaScript, Webpack, React, and [Atlaskit](https://atlaskit.atlassian.com/).

## Starting Bitbucket

To start Bitbucket, first install all of the dependencies:

```sh
mvn -T 1C clean install -DskipTests
```

and then run this command to start Bitbucket:

```sh
mvn bitbucket:run -DskipTests
```

## Developing the plugin

In the project directory, you can run:

### `npm start`

It builds the frontend and puts it in the watch mode with hot reload.
In other words, if you have the whole plugin and an instance already working,
this will enable you to make quick changes with instant preview.

## Before you git push

Any unit tests or eslint errors will cause the build to fail,
so it's worth checking these before you push to branch.

### `npm test`

For running UI tests.

### `npm run lint`

Checks the frontend plugin for styling errors.

The ruleset is set to be compatible with other Server plugins,
so please mind that when considering making changes to it.

### `npm run lint --fix`

Will additionally fix any automatically-fixable issues.
