angular.module('player',['ngRoute'])
  .config(function($routeProvider){
    $routeProvider.when("/players",{
      templateUrl: 'partials/player/players.html',
      controller: 'PlayerListController'
    });

    $routeProvider.when("/player/new",{
      templateUrl: 'partials/player/create-player.html',
      controller: 'PlayerCreateController'
    });

    $routeProvider.when("/player/edit/:id",{
      templateUrl: 'partials/player/update-player.html',
      controller: 'PlayerEditController',
      resolve:{
        selectedPlayer:['PlayerService','$route', '$location',
          function(PlayerService, $route, $location){
            var player = PlayerService.getById($route.current.params.id);
            if(!player){
              $location.path('players');
            }
            return player;
          }],
      }
    });
  });
