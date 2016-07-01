angular.module('invitation',['ngRoute'])
  .config(function($routeProvider){

    $routeProvider.when('/play-game-invitations/:id', {
      templateUrl: 'partials/invitation/play-game.html',
      controller: 'PlayGameInvitaionViewController',
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
