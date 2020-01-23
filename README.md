Bitbucket Server [Client-side Extension](https://developer.atlassian.com/server/framework/clientside-extensions/) template powered by JavaScript, Webpack, React, and [Atlaskit](https://atlaskit.atlassian.com/).

## Requirements
 - **Node** 12.13.0 (you can use nvm)
 - **Maven** 3.6.2
 - **Java JDK** 1.8

## Starting Bitbucket

To start Bitbucket, first install all of the maven dependencies:

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

## Using a template to build your plugin

By default this template have a few a pre-defined plugin keys that should be unique for every plugin. 
To build your own custom plugin you should rename the **group id**, **artifact id** and the **plugin key** values:

 - artifact id: `bitbucket-plugin-template`
 - group id: `com.atlassian.myapp`   
 - plugin key: `com.atlassian.myapp.bitbucket-plugin-template`
 
You should find and replace those values in all of the files:
 - `config/webpack.constants.js` - `PLUGIN_KEY` const
 - `pom.xml` - `groupId` and `artifactId` tags
 - `package.json` - `name` field
