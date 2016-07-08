describe('player:controllers', function(){
  beforeEach(module('app'));

  var mockPlayer;
  beforeEach(module(function($provide){
    $provide.factory('PlayerService', function(){
      var mock = {};
      mockPlayer = {name : 'Mock player name'};
      mock.players = [mockPlayer];
      mock.getAll = function(){return mock.players;};
      mock.delete = function(id){};
      return mock;
    });
  }));

  describe('PlayerListController', function(){
    var $scope, location, service, ctrl;
    beforeEach(inject(function($rootScope, $location, PlayerService, $controller){
      $scope = $rootScope.$new();
      location = $location;
      service = PlayerService;
      ctrl = $controller('PlayerListController', {
        $scope : $scope,
        $location : location,
        PlayerService: service,
      });

      spyOn(PlayerService, 'getAll').and.callThrough();
      spyOn(PlayerService, 'delete').and.callThrough();
      spyOn(location, 'path');
    }));

    it('should be defined', function(){
      expect(ctrl).toBeDefined();
    });

    it('shoud have players list', function(){
      expect($scope.players[0]).toEqual(mockPlayer);
      //expect(service.getAll).toHaveBeenCalled();
    });

    it('should have functionality to create player', function(){
      $scope.createPlayer();
      expect(location.path).toHaveBeenCalledWith('/player/new');
    });

    it('should have functionality to edit', function(){
      var player = {id : 1};
      $scope.editPlayer(player);
      expect(location.path).toHaveBeenCalledWith('/player/edit/' + player.id);
    });

    it('should not have edit player functionality for undefined players', function(){
      var player = {};
      $scope.editPlayer(player);
      expect(location.path).not.toHaveBeenCalledWith('/player/edit/' + player.id);
    });

    it('should have delete player functionality', function(){
      mockPlayer.id = 1;
      $scope.deletePlayer(mockPlayer);
      expect(service.delete).toHaveBeenCalledWith(mockPlayer.id);
    });
  });
});
