angular.module('team')
  .controller('JoinTeamInvitationController',
  ['$scope','$routeParams','Team', 'Player', 'JoinTeamInvitation','JoinTeamInvitationService','TeamService',
  function($scope, $routeParams, Team, Player, JoinTeamInvitation, JoinTeamInvitationService, TeamService){

    $scope.accept = function(invitation){
      var team = TeamService.get(invitation.team.id);
      team.players.push(invitation.player.id);
      TeamService.update(team);
      JoinTeamInvitationService.delete(invitation);
      $scope.invitations = JoinTeamInvitationService.getByTeam($routeParams.id);
    };

    $scope.reject = function(invitation){
      JoinTeamInvitationService.delete(invitation);
      $scope.invitations = JoinTeamInvitationService.getByTeam($routeParams.id);
    };

    var init = function(){
      $scope.invitations = JoinTeamInvitationService.getByTeam($routeParams.id);
    };
    init();

}]);
