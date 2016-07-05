angular.module('invitation')
  .factory('PlayGameInvitationService', [function(){
    var service = {};
    var playGameInvitations = [];

    service.create = function(invitation){
      if(invitation.gamePost&&invitation.team){
        invitation.id = playGameInvitations.length + 1;
        playGameInvitations.push(invitation);
      }
      return invitation;
    };

    service.update = function(invitation){
      angular.forEach(playGameInvitations, function(e, index){
        if(e.id === invitation.id){
          playGameInvitations[index] = invitation;
        }
      });
      return invitation;
    };

    service.delete = function(invitationId){
      var invitationIndex;
      angular.forEach(playGameInvitations, function(e, index){
        if(e.id == invitationId){
          invitationIndex = index;
        }
      });
      if(invitationIndex >= 0) playGameInvitations.splice(invitationIndex, 1);
    };


    service.getTeamInvitations = function(teamId){
      return playGameInvitations.filter(function(invitation){
        return invitation.gamePost.team.id == teamId;
      });
    };

    var init = function(){
    };

    init();

    return service;
  }]);
