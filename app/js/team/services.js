angular.module('team')
  .factory('TeamService', ['Team','PlayerService',
  function(Team, PlayerService){
    var service = {};
    var teams = [];

    service.create = function(team){
      if(team.name){
        team.id = teams.length + 1;
        teams.push(team);
        return team;
      }
    };

    service.update = function(team){
      angular.forEach(teams, function(e, index){
        if(e.id === team.id){
          teams[index] = team;
        }
      });
      return team;
    };

    service.delete = function(teamId){
      var teamIndex;
      angular.forEach(teams, function(e, index){
        if(e.id === teamId){
          teamIndex = index;
        }
      });
      if(teamIndex >= 0) teams.splice(teamIndex, 1);
    };

    service.getUserTeams = function(userId){
      return teams.filter(function(team){
        var players = team.players.filter(function(player){
          return player.id == userId;
        });
        return players.length > 0;
      });
    };

    service.getAll= function(){
      return teams;
    };

    service.get = function(teamId){
      console.log('service.get('+teamId+')');
      var team;
      angular.forEach(teams, function(e, index){
        if(e.id == teamId){
          team = angular.copy(teams[index]);
        }
      });
      return team;
    };

    service.getAvailableTeams = function(teamId){
      var availableTeams=[], team;
      angular.forEach(teams, function(e, index){
        if(e.id !== teamId){
          team = angular.copy(teams[index]);
          availableTeams.push(team);
        }
      });
      return availableTeams;
    };

    var setupInitialTeams = function(){
      var players = [];
      players.push(PlayerService.getById(1));
      players.push(PlayerService.getById(2));
      players.push(PlayerService.getById(3));

      teams.push(new Team({
        id: 1,
        name: 'Team 1',
        location: 'City 1',
        players: players,
        level: 'Beginer'
      }));

      teams.push(new Team({
        id: 2,
        name: 'Team 2',
        location: 'City 2',
        players: players,
        level: 'Beginer'
      }));

      teams.push(new Team({
        id: 3,
        name: 'Team 3',
        location: 'City 3',
        players: players,
        level: 'intermediate'
      }));
    };

    var init = function(){
      setupInitialTeams();
    };
    init();

    return service;
  }]);
