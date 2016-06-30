angular.module('player')
  .factory('PlayerService', ['Player', 'Position','PositionService',
  function(Player, Position, PositionService){
    var service = {};
    var players = [];

    service.create = function(player){
      if(player.name){
        player.id = players.length + 1;
        players.push(player);
      }
      return player;
    };

    service.update = function(player){
      console.log(player);
      angular.forEach(players, function(e, index){
        if(e.id === player.id){
          players[index] = player;
        }
      });
      return player;
    };

    service.delete = function(playerId){
      var playerIndex;
      angular.forEach(players, function(e, index){
        if(e.id == playerId){
          playerIndex = index;
        }
      });
      if(playerIndex >= 0) players.splice(playerIndex, 1);
    };

    service.getById = function(playerId){
      var player;
      angular.forEach(players, function(e, index){
         if(e.id == playerId){
           player = angular.copy(players[index]);
         }
      });
      return player;
    };

    service.getAll = function(){
      return players;
    };

    var setupInitial = function(){
      players.push(new Player({
        id: players.length + 1,
        name: 'Player 1',
        positions: PositionService.getByLabel('Defence')
      }));

      players.push(new Player({
        id: players.length + 1,
        name: 'Player 2',
        positions: PositionService.getByLabel('Offense')
      }));

      players.push(new Player({
        id: players.length + 1,
        name: 'Player 3',
        positions: PositionService.getByLabel('Goalkeeper')
      }));
    };

    var init = function(){
      setupInitial();
    };
    init();

    return service;
  }]);


angular.module('player')
  .factory('PositionService', ['Position', function(Position){
    var service = {};
    var positions = [];

    service.getByLabel = function(label){
      return positions.filter(function(position){
        return position.label == label;
      });
    };

    service.getById = function(positionId){
      return positions.filter(function(position){
        return position.id == positionId;
      });
    };

    service.getAll = function(){
      return positions;
    };

    var setupInitial = function(){
      positions.push(new Position({
        id: positions.length + 1,
        label: 'Defence'
      }));

      positions.push(new Position({
        id: positions.length + 1,
        label: 'Offense'
      }));

      positions.push(new Position({
        id: positions.length + 1,
        label: 'Goalkeeper'
      }));
    };

    var init = function(){
      setupInitial();
    };
    init();

    return service;
  }]);
