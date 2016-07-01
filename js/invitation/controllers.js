angular.module('invitation')
  .controller('PlayGameInvitaionViewController', ['$scope','PlayGameInvitationService',
  'selectedTeam','Game','GameService','$location',
   function($scope, PlayGameInvitationService,
     selectedTeam, Game, GameService, $location){

     $scope.accept = function(invitation){
       var game;
       if(invitation.gamePost&&invitation.team){
         game = GameService.create(new Game({
           homeTeam: invitation.gamePost.team,
           awayTeam: invitation.team,
           location: invitation.gamePost.field.name,
           time: invitation.gamePost.time,
           day: invitation.gamePost.day
         }));
       }
       if(game){
         var invitationIndex;
         angular.forEach($scope.gameInvitations, function(e, index){
           if(e.id === invitation.id){
             invitationIndex = index;
           }
         });
         $scope.gameInvitations.splice(invitationIndex, 1);
         $location.path('/future-games');
       }
     };

     $scope.decline = function(invitation){

     };

    var initPlayGameInvitations = function(){
      $scope.gameInvitations = PlayGameInvitationService.getTeamInvitations(selectedTeam.id);
    };

    var init = function(){
      initPlayGameInvitations();
    };
    init();

  }]);
