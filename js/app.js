angular.module('app',['player', 'team','field','ngRoute'])
  .config(function($routeProvider){
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

    $routeProvider.when("/fields",{
      templateUrl: 'partials/field/fields.html',
      controller: 'FieldListController'
    });

    $routeProvider.when("/field/new",{
      templateUrl: 'partials/field/create-field.html',
      controller: 'FieldCreateController'
    });

    $routeProvider.when("/field/edit/:id",{
      templateUrl: 'partials/field/update-field.html',
      controller: 'FieldEditController',
      resolve:{
        selectedField:['FieldService', '$route', '$location',
          function(FieldService, $route, $location){
            var field = FieldService.getById($route.current.params.id);
            if(!field){
              $location.path("/fields");
            }
            return field;
          }]
      }
    });

    $routeProvider.when("/companies", {
      templateUrl: 'partials/field/companies.html',
      controller: 'CompanyListController'
    });

    $routeProvider.when("/company/new", {
      templateUrl: 'partials/field/create-company.html',
      controller: 'CompanyCreateController'
    });

    $routeProvider.when("/company/edit/:id", {
      templateUrl: 'partials/field/update-company.html',
      controller: 'CompanyEditController',
      resolve:{
        selectedCompany:['CompanyService', '$route', '$location',
        function(CompanyService, $route, $location){
          var company = CompanyService.getById($route.current.params.id);
          if(!company){
            $location.path("/companies");
          }
          return company;
        }]
      }
    });

    $routeProvider.otherwise("/teams");
  });

angular.module('player',[]);
angular.module('team',[]);
angular.module('field',[]);
