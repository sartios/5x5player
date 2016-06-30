angular.module('app',['player', 'team','field','ngRoute'])
  .config(function($routeProvider){

    $routeProvider.when("/home", {
      templateUrl: 'partials/user/home',
      topNav: 'partials/user/top-nav.html'
    });

    $routeProvider.otherwise("/home");

    
  });
