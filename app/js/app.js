angular.module('app',['player', 'team','field','user',
'invitation','game','ngRoute'])
  .config(function($routeProvider){

    $routeProvider.when("/home", {
      templateUrl: 'partials/user/home',
      topNav: 'partials/user/top-nav.html',
      controller: 'HomeController'
    });

    $routeProvider.otherwise("/home");


  });

angular.module('user',[]);
angular.module('invitation',[]);
angular.module('game',[]);
angular.module('field',[]);
angular.module('team',[]);
angular.module('player',[]);
