angular.module('invitation')
  .controller('PlayGameInvitaionViewController', ['$scope','PlayGameInvitationService','selectedTeam',
   function($scope, PlayGameInvitationService, selectedTeam){

    var initPlayGameInvitations = function(){
      $scope.gameInvitations = PlayGameInvitationService.getTeamInvitations(selectedTeam.id);
    };

    var init = function(){
      initPlayGameInvitations();
    };
    init();

  }]);
