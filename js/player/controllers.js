angular.module('player')
  .controller('TeamSearchController', ['$scope', function($scope){

    var teamResult = [];

    function TeamResult(name, field,link, contact,numOfPlayers){
      this.name = name;
      this.field = field;
      this.link = link;
      this.contact = contact;
      this.numOfPlayers = numOfPlayers;
    }

    var addTeamResult = function(name, field,link, contact,numOfPlayers){
      teamResult.push(new TeamResult(name, field,link, contact,numOfPlayers));
    };

    var init = function(){
      addTeamResult("Golden Fish", "Tsatsalou", "https://www.facebook.com/sartios.savramis.9", "kostakis",2);
      addTeamResult("SouraPasa", "Kepernaou", "https://www.facebook.com/sartios.savramis.9", "stelios",1);
      addTeamResult("Koukouroukou", "Tsernompil", "https://www.facebook.com/sartios.savramis.9", "sartios",2);
      $scope.teams = teamResult;
    };

    init();
}]);

angular.module('player')
  .controller('PlayerListController', ['$scope', '$location', 'PlayerService', function($scope,$location, PlayerService){

    $scope.createPlayer = function(){
      $location.path('/player/new');
    };

    $scope.editPlayer = function(player){
      $location.path('/player/edit/' + player.id);
    };

    $scope.deletePlayer = function(player){
      PlayerService.delete(player.id);
    };

    var init = function(){
      $scope.players = PlayerService.getAll();
    };
    init();
  }]);

angular.module('player')
  .controller('PlayerCreateController', ['$scope','$location',
  'PlayerService','PositionService',
  'Player', 'Position',
   function($scope,$location, PlayerService, PositionService, Player, Position){

     $scope.createPlayer = function(){
       var position = PositionService.getById($scope.selectedPosition),
       player, name = $scope.name;
       if(position&&name){
          player = PlayerService.create(new Player({
          name : name,
          positions: position
         }));
       }
       $location.path('/players');
     };

     var setupPositions = function(){
       $scope.positions = PositionService.getAll();
     }

    var init = function(){
      setupPositions();
    };

    init();
  }]);

  angular.module('player')
    .controller('PlayerEditController', ['$scope', 'PlayerService','selectedPlayer','PositionService','$location',
    function($scope, PlayerService, selectedPlayer, PositionService, $location){

      $scope.updatePlayer = function(){
        var position = PositionService.getById($scope.selectedPosition.id),
        name = $scope.player.name, player = PlayerService.getById(selectedPlayer.id);
        if(position&&name){
          player.positions = position;
          player.name = name;
          console.log(player.id);
          PlayerService.update(player);
        }
        $location.path('players');
      };

      var setupPositions = function(){
        $scope.positions = PositionService.getAll();
      }

     var init = function(){
       setupPositions();
       $scope.player = selectedPlayer;
       $scope.selectedPosition = selectedPlayer.positions[0];
     };

      init();

    }]);
