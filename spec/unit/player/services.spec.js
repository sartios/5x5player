describe('player.services', function(){
  beforeEach(module('app'));

  describe('PlayerService', function(){
    it('should create a player', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      expect(player.id).toEqual(PlayerService.getAll().length);
    }));

    it('should not create a player without name', inject(function(PlayerService, Player){
      var player = new Player({});
      var expectedPlayers = PlayerService.getAll();
      var createdPlayer = PlayerService.create(player);
      var actualPlayers = PlayerService.getAll();
      expect(player).toEqual(createdPlayer);
      expect(expectedPlayers).toEqual(actualPlayers);
    }));

    it('should update a player that exists', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      player.name = 'modified player name';
      var modifiedPlayer = PlayerService.update(player);
      expect(player).toEqual(modifiedPlayer);
    }));

    it('should not update a player that does not exist', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      var players = PlayerService.getAll();
      PlayerService.update(player);
      var playersAfterUpdate = PlayerService.getAll();
      expect(playersAfterUpdate).toEqual(players);
    }));

    it('should delete a player', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      var players = PlayerService.getAll().length;
      PlayerService.delete(player.id);
      var actualPlayers = PlayerService.getAll().length;
      expect(players).toEqual(actualPlayers + 1);
    }));

    it('should delete nothing if the player does not exist', inject(function(PlayerService, Player){
      var players = PlayerService.getAll().length;
      PlayerService.delete(1234441);
      var actualPlayers = PlayerService.getAll().length;
      expect(players).toEqual(actualPlayers);
    }));

    it('should return a player by id', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      var actualPlayer = PlayerService.getById(player.id);
      expect(player).toEqual(actualPlayer);
    }));

    it('should return undefined if the player does not exist',inject(function(PlayerService, Player){
      var player = PlayerService.getById(12333);
      expect(player).toBeFalsy();
    }));

    it('should return all players', inject(function(PlayerService){
      expect(PlayerService.getAll().length).toEqual(3);
    }));
  });

  describe('PositionService', function(){
    it('should return an array of positions with the same label',
     inject(function(PositionService, Position){
      var position = new Position({
        label : 'sample label'
      });
      PositionService.getAll().push(position);
      expect(PositionService.getByLabel(position.label)).toEqual([position]);
    }));

    it('should return an empty array when positions with the label does not exist',
     inject(function(PositionService, Position){
      var position = new Position({
        label : 'sample label'
      });
      expect(PositionService.getByLabel(position.label)).toEqual([]);
    }));

    it('should return a position with the id', inject(function(PositionService, Position){
       var position = new Position({
         id : 123,
         label : 'sample label'
       });
       PositionService.getAll().push(position);
       expect(PositionService.getById(position.id)).toEqual(position);
    }));

    it('should return undefined if a position with the id does not exist',
    inject(function(PositionService, Position){
       var position = new Position({
         id : 123,
         label : 'sample label'
       });
       expect(PositionService.getById(position.id)).toBeFalsy();
    }));
  });














});
