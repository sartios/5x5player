angular.module('team',['ngRoute'])
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

    $routeProvider.when("/search-team",{
      templateUrl: 'partials/player/team-search.html',
      controller: 'TeamSearchController'
    });

    $routeProvider.when("/teams", {
      templateUrl: 'partials/team/teams.html',
      controller: 'TeamListController'
    });

    $routeProvider.when("/team/new",{
      templateUrl: 'partials/team/create-team.html',
      controller: 'TeamCreateController'
    });

    $routeProvider.when("/team/player-invitations/:id",{
      templateUrl: 'partials/joinTeam/add-players.html',
      controller: 'JoinTeamInvitationController'
    });

    $routeProvider.when("/team/edit/:id",{
      templateUrl: 'partials/team/update-team.html',
      controller: 'TeamEditController',
      resolve:{
        selectedTeam : ['TeamService', '$route','$location',
        function(TeamService, $route, $location){
          var team = TeamService.get($route.current.params.id);
          if(!team){
            $location.path('/teams');
          }
          return team;
        }],
      }
    });

    $routeProvider.when("/team/mine", {
      templateUrl: 'partials/team/my-teams.html',
      controller: 'TeamController'
    });

    $routeProvider.when("/team/view/:id",{
      templateUrl: 'partials/team/team.html',
      controller: 'TeamViewController',
      resolve:{
        selectedTeam : ['TeamService', '$route','$location',
        function(TeamService, $route, $location){
          var team = TeamService.get($route.current.params.id);
          if(!team){
            $location.path('/teams');
          }
          return team;
        }],
      }
    });

  });
