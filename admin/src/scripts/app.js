import mainController from './controllers/mainController.js';
// import detailController from './controller/detailController.js';
// import utilController from './controller/utilController.js';
// import SharedService from './service/sharedService.js';
// import pController from './controller/pController.js';
// import utilController from './controller/utilController.js';
// import sharedService from './services/sharedService.js';

const sb = angular.module('sb', ['underscore', 'ngRoute', 'angularMoment']);
sb.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
}]);

sb.controller('mainController', mainController);
// sb.controller('detailController', detailController);
// sb.controller('utilController', utilController);

// sb.service('sharedService', SharedService);

mainController.$inject  = ['$http', '$q', '$timeout', '$window', '$interval', '_', 'moment'];
// detailController.$inject  = ['$http', '$q', '$timeout', '$window', '$interval', '_', 'moment'];
