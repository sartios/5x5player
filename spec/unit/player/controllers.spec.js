describe('player:controllers', function(){
  beforeEach(module('app'));

  var mockPlayer, mockPosition, player;
  beforeEach(module(function($provide){
    $provide.factory('PlayerService', function(){
      var mock = {};
      mockPlayer = {name : 'Mock player name'};
      mock.players = [mockPlayer];
      mock.getAll = function(){return mock.players;};
      mock.getById = function(id){return mock.players;};
      mock.create = function(player){return player;};
      mock.delete = function(id){};
      mock.update = function(player){return player;};
      return mock;
    });

    $provide.factory('PositionService', function(){
      var mock = {};
      mockPosition = {label: 'sample position'};
      mock.positions = [mockPosition];
      mock.getById = function(id){return mockPosition;};
      mock.getAll = function(){return mock.positions;};
      return mock;
    });

    player = {name : 'sample player', positions: []};
    player.positions.push(mockPosition);
    $provide.value('selectedPlayer', player);

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

  describe('PlayerCreateController', function(){
    var $scope, location, service, ctrl;
    beforeEach(inject(
    function($rootScope, $location, $controller, PlayerService, PositionService){
      $scope = $rootScope.$new();
      location = $location;
      service = PlayerService;
      ctrl = $controller('PlayerCreateController', {
        $scope : $scope,
      });

      spyOn(PlayerService, 'create').and.callThrough();
      spyOn(location, 'path');
    }));

    it('should define a controller', function(){
      expect(ctrl).toBeDefined();
    });

    it('should have a list of the positions', function(){
      expect($scope.positions[0]).toEqual(mockPosition);
    });

    it('should have a function to create player', function(){
      $scope.selectedPosition = 1;
      $scope.name = 'sample name';
      $scope.createPlayer();
      expect(service.create).toHaveBeenCalled();
      expect(location.path).toHaveBeenCalledWith('/players');
    });
  });



  describe('PlayerEditController', function(){
    var $scope, location, service, ctrl;

    beforeEach(inject(
    function($rootScope, $location, $controller,
      PlayerService, PositionService, selectedPlayer){
      $scope = $rootScope.$new();
      location = $location;
      service = PlayerService;

      ctrl = $controller('PlayerEditController', {
        $scope : $scope,
        selectedPlayer : selectedPlayer
      });

      spyOn(PlayerService, 'update').and.callThrough();
      spyOn(location, 'path');
    }));

    it('should define a controller', function(){
      expect(ctrl).toBeDefined();
    });

    it('should have a list with positions', function(){
      expect($scope.positions[0]).toEqual(mockPosition);
    });

    it('should have a player', function(){
      expect($scope.player).toEqual(player);
    });

    it('should have selected player position', function(){
      expect($scope.selectedPosition).toEqual(player.positions[0]);
    });

    it('should have update player functionality', function(){
      $scope.selectedPosition.id = 1;
      $scope.player = player;
      $scope.updatePlayer();
      expect(service.update).toHaveBeenCalled();
      expect(location.path).toHaveBeenCalledWith('/players');
    });

  });
});
