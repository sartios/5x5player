angular.module('game', ['ngRoute'])
  .config(function($routeProvider){

    $routeProvider.when("/my-games-history",{
      templateUrl: 'partials/game/my-games-history',
      controller: 'MyGamesHistoryController'
    });

    $routeProvider.when("/propose-game",{
      templateUrl: 'partials/game/propose-game.html',
      controller: 'ProposeGameController'
    });

    $routeProvider.when("/future-games", {
      templateUrl: 'partials/game/games.html',
      controller: 'FutureGamesController'
    });

  });
