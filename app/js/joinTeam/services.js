angular.module('team')
  .factory('JoinTeamInvitationService', ['Team', 'Player', 'JoinTeamInvitation',
function(Team, Player, JoinTeamInvitation){
  var service = {};
  var invitations = [];

  service.create = function(invitation){
    if(invitation.team && invitation.player){
      invitation.id = invitations.length + 1;
      invitations.push(angular.copy(invitation));
    }
    return invitation;
  };

  service.update = function(invitation){
    if(invitation.team && invitation.player){
        angular.forEach(invitations, function(e, index){
        if(e.id === invitation.id){
          invitations[index] = angular.copy(invitation);
        }
      });
    }
    return invitation;
  };

  service.delete = function(invitation){
    var invitationIndex = 0;
    angular.forEach(invitations, function(e, index){
      if(e.id === invitation.id){
        invitationIndex = index;
      }
    });
    if(invitationIndex>=0) invitations.splice(invitationIndex,1);
  };

  service.getAll = function(){
    return invitations;
  };

  service.getById = function(invitationId){
    var invitation;
    angular.forEach(invitations, function(e, index){
      if(e.id == invitationId){
        invitation = angular.copy(invitations[index]);
      }
    });
    return invitation;
  };

  service.getByTeam = function(teamId){
    return invitations.filter(function(invitation){
      return invitation.team.id == teamId;
    });
  };

  service.getByPlayer = function(playerId){
    return invitations.filter(function(invitation){
      return invitation.player.id == playerId;
    });
  };

  var setupInitialInvitations = function(){
    invitations.push(new JoinTeamInvitation({
      id: 1,
      team: new Team({
        id: 1,
        name: 'Team 1',
        location: 'City 1',
        level: 'beginer'
      }),
      player: new Player({
        id: 1,
        name: 'Player 1'
      })
    }));

    invitations.push(new JoinTeamInvitation({
      id: 2,
      team: new Team({
        id: 2,
        name: 'Team 2',
        location: 'City 2',
        level: 'beginer'
      }),
      player: new Player({
        id: 1,
        name: 'Player 1'
      })
    }));

    invitations.push(new JoinTeamInvitation({
      id: 3,
      team: new Team({
        id: 1,
        name: 'Team 1',
        location: 'City 1',
        level: 'beginer'
      }),
      player: new Player({
        id: 2,
        name: 'Player 2'
      })
    }));
  };

  var init = function(){
    setupInitialInvitations();
  };
  init();

  return service;
}]);
