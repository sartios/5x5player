angular.module('team')
  .factory('TeamService', ['Team', function(Team){
    var service = {};
    var teams = [];

    service.create = function(team){
      if(team.name){
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
        return team.players.indexOf(userId) > -1;
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
      console.log('service.getAvailableTeams('+teamId+')');
      var availableTeams=[], team;
      angular.forEach(teams, function(e, index){
        if(e.id == teamId){
          team = angular.copy(teams[index]);
          availableTeams.push(team);
        }
      });
      return teams;
    };

    var setupInitialTeams = function(){
      teams.push(new Team({
        id: 1,
        name: 'Team 1',
        location: 'City 1',
        players: [1,2,3,4,5],
        level: 'Beginer'
      }));

      teams.push(new Team({
        id: 2,
        name: 'Team 2',
        location: 'City 2',
        players: [5,6,2,7,1],
        level: 'Beginer'
      }));

      teams.push(new Team({
        id: 3,
        name: 'Team 3',
        location: 'City 3',
        players: [5,6,2,7,1],
        level: 'intermediate'
      }));
    };

    var init = function(){
      setupInitialTeams();
    }
    init();

    return service;
  }]);
