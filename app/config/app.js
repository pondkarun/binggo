var app = angular.module("app", ['ngRoute']);

var webConfig = {};
webConfig.client = window.location.protocol + '//' + window.location.host+'//';
app.service('Service', function () { /* ... */ });