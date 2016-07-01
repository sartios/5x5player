angular.module('game')
  .controller('ProposeGameController',['$scope', 'GameService', 'TeamService','Game','Team',
function($scope, GameService, TeamService, Game, Team){

  var getAvailableTeams = function(){
    return TeamService.getAvailableTeams(1);
  };

  var getAvailableLocations = function(){
    var teams = TeamService.getAll();
    return teams.map(function(team){
      return team.location;
    });
  };

  $scope.proposeGame = function(team){
    var game = new Game({
      id : GameService.getAll().length + 1,
      homeTeam : new Team({
        id: 1,
        name: 'Team 1',
        location: 'City 1',
        players: [1,2,3,4,5],
        level: 'Beginer'
      }),
      awayTeam : team,
      location : 'City 1',
      time : '21:00',
      score: undefined
    });
    return GameService.create(game);
  };

  var init = function(){
    $scope.availableTeams = getAvailableTeams();
    $scope.locations = getAvailableLocations();
  };
  init();

}]);

angular.module('game')
  .controller('MyGamesHistoryController', ['$scope', 'GameService', function($scope, GameService){

    var buildHomeGames = function(){
      $scope.myGames = GameService.getHomeGames(1);
    }

    var buildAwayGames = function(){
      $scope.otherGames = GameService.getAwayGames(1);
    }

    var init = function(){
      buildHomeGames();
      buildAwayGames();
    };

    init();
  }]);

angular.module('game')
  .controller('FutureGamesController', ['$scope', 'GameService', function($scope, GameService){

    var init = function(){
      $scope.games = GameService.getFutureGames();
    };
    init();
  }]);
