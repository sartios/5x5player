describe('service:TeamService', function(){
  var team;
  
  beforeEach(module(function($provide){
    $provide.factory('PlayerService', function(){
        var service = {};
        service.getById = function(id){
          return {};
        };
        return service;
      });
  }));

  beforeEach(module('app'));

  it('should create a team',inject(function(TeamService, Team){
      team = new Team({
        name: 'myTeam'
      });
     TeamService.create(team);
     expect(TeamService.getAll().length).toEqual(4);
  }));

  it('should create an id for the new team', inject(function(TeamService, Team){
    team = new Team({
      name: 'myTeam'
    });
   team = TeamService.create(team);
   expect(team.id).toBeTruthy();
  }));

  it('should not create a team without name', inject(function(TeamService, Team){
    team = new Team({
      id: 1
    });
    TeamService.create(team);
    expect(TeamService.getAll().length).toEqual(3);
  }));

  it('should update a team that exists', inject(function(TeamService, Team){
    team = new Team({
      name: 'My test team'
    });
    team = TeamService.create(team);
    team.name = 'My test team has been updated';
    var updatedTeam = TeamService.update(team);
    expect(updatedTeam).toEqual(team);
  }));

  it('should not update a team that does not exist', inject(function(TeamService, Team){
    team = new Team({
      name: 'team does not exists'
    });
    var teams = TeamService.getAll();
    TeamService.update(team);
    var teamsAfterUpdate = TeamService.getAll();
    expect(teams).toEqual(teamsAfterUpdate);
  }));

  it('should delete a team that exists', inject(function(TeamService, Team){
    team = new Team({
      name: 'team to be deleted'
    });
    team = TeamService.create(team);
    TeamService.delete(team.id);
    team = TeamService.get(team.id);
    expect(team).toBeFalsy();
  }));

  it('should return user teams', inject(function(TeamService, Team, Player){
    var player = new Player({
      id: 4,
      name: 'Player 2',
      positions: 'Goalkeeper',
      available: false,
      number: 7
    });
    var players = [player];
    team = new Team({
      name: 'Team 1',
      location: 'City 1',
      players: players,
      level: 'Beginer'
    });
    team = TeamService.create(team);

    var teams = TeamService.getUserTeams(player.id);
    expect(teams[0]).toEqual(team);
  }));


  it('should return the team by its id', inject(function(TeamService, Team){
    team = new Team({
      name: 'Test Team'
    });
    team = TeamService.create(team);
    expect(TeamService.get(team.id)).toEqual(team);
  }));

  it('should return all the teams except mine', inject(function(TeamService, Team){
    team = new Team({
      name : 'Test Team'
    });
    team = TeamService.create(team);
    var teams = TeamService.getAvailableTeams(team.id);
    expect(teams.indexOf(team)).toEqual(-1);
  }));

});
