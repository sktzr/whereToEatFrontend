/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,
});

app.import("vendor/firebase/firebase-debug.js");
//app.import("vendor/ember-data/dist/ember-data.js");
app.import("vendor/handlebars/handlebars.js");
app.import("vendor/emberfire/dist/emberfire.js");

//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
