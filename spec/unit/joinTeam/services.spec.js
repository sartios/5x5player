describe('services:JoinTeamInvitationService', function(){
  beforeEach(module('app'));

  it('should create an invitation',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    }));
    expect(invitation).toEqual(JoinTeamInvitationService.getById(invitation.id));
  }));

  it('should not create an invitation without team',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      player : {name : 'sample player'}
    }));
    expect(invitation.id).toBeFalsy();
  }));

  it('should not create an invitation without player',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'}
    }));
    expect(invitation.id).toBeFalsy();
  }));

  it('should update an invitation',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    }));
    invitation.team.name = invitation.team.name + ' modified';
    invitation.player.name = invitation.player.name + ' modified';
    JoinTeamInvitationService.update(invitation);
    expect(invitation).toEqual(JoinTeamInvitationService.getById(invitation.id));
  }));

  it('should not update an invitation without team',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    }));
    delete invitation.team;
    invitation.player.name = invitation.player.name + ' modified';
    JoinTeamInvitationService.update(invitation);
    var actualInvitation = JoinTeamInvitationService.getById(invitation.id);
    expect(actualInvitation.team.name).toEqual('sample team');
  }));

  it('should not update an invitation without player',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    }));
    invitation.team.name = invitation.team.name + ' modified';
    delete invitation.player;
    JoinTeamInvitationService.update(invitation);
    var actualInvitation = JoinTeamInvitationService.getById(invitation.id);
    expect(actualInvitation.player.name).toEqual('sample player');
  }));

  it('should delete an invitation',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    }));
    JoinTeamInvitationService.delete(invitation);
    var actualInvitation = JoinTeamInvitationService.getById(invitation.id);
    expect(actualInvitation).toBeFalsy();
  }));

  it('should not delete an invitation that does not exist',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = new JoinTeamInvitation({
      id : -1,
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    });
    var expectedSize = JoinTeamInvitationService.getAll().length;
    JoinTeamInvitationService.delete(invitation);
    var actualSize = JoinTeamInvitationService.getAll().length;
    expect(expectedSize).toEqual(actualSize);
  }));

  it('should return an invitation by its id',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {name : 'sample team'},
      player : {name : 'sample player'}
    }));
    var actualInvitation = JoinTeamInvitationService.getById(invitation.id);
    expect(invitation).toEqual(actualInvitation);
  }));

  it('should not return an invitation if id does not exist',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.getById(-9);
    expect(invitation).toBeFalsy();
  }));

  it('should return invitations by team id',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    })), expectedInvitations = [];
    expectedInvitations.push(invitation);
    expectedInvitations.push(JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    })));
    expectedInvitations.push(JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    })));

    var invitations = JoinTeamInvitationService.getByTeam(invitation.team.id);
    expect(invitations).toEqual(expectedInvitations);
  }));

  it('should not return invitations for teams that do not exist',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    }));
    JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    }));
    JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    }));

    var invitations = JoinTeamInvitationService.getByTeam(invitation.team.id + 100);
    expect(invitations).toEqual([]);
  }));

  it('should return invitations by player id',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    })), expectedInvitations = [];
    expectedInvitations.push(invitation);
    expectedInvitations.push(JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    })));
    expectedInvitations.push(JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    })));

    var invitations = JoinTeamInvitationService.getByTeam(invitation.player.id);
    expect(invitations).toEqual(expectedInvitations);
  }));

  it('should not return invitations for players that do not exist',
  inject(function(JoinTeamInvitation, JoinTeamInvitationService){
    var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    }));
    JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    }));
    JoinTeamInvitationService.create(new JoinTeamInvitation({
      team : {id: 100, name : 'sample team'},
      player : {id: 100, name : 'sample player'}
    }));

    var invitations = JoinTeamInvitationService.getByTeam(invitation.player.id + 100);
    expect(invitations).toEqual([]);
  }));


});
