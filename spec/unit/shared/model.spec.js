describe('Model', function(){

  beforeEach(module('app'));

  describe('Team', function(){
    it('should have id', inject(function(Team){
      var team = new Team({
        id: 1
      });
      expect(team.id).toEqual(1);
    }));

    it('should have a name', inject(function(Team){
      var team = new Team({
        name: 'sample name'
      });
      expect(team.name).toEqual('sample name');
    }));

    it('should have a location', inject(function(Team){
      var team = new Team({
        location: 'sample location'
      });
      expect(team.location).toEqual('sample location');
    }));

    it('should have players', inject(function(Team){
      var team = new Team({
        players: 'sample players'
      });
      expect(team.players).toEqual('sample players');
    }));

    it('should have level', inject(function(Team){
      var team = new Team({
        level: 'sample level'
      });
      expect(team.level).toEqual('sample level');
    }));
  });

  describe('Game', function(){
    it('should have an id', inject(function(Game){
      var game = new Game({
        id : 1
      });
      expect(game.id).toEqual(1);
    }));

    it('should have a home team', inject(function(Game){
      var game = new Game({
        homeTeam : 'sample team'
      });
      expect(game.homeTeam).toEqual('sample team');
    }));

    it('should have an away team', inject(function(Game){
      var game = new Game({
        awayTeam : 'sample team'
      });
      expect(game.awayTeam).toEqual('sample team');
    }));

    it('should have a location', inject(function(Game){
      var game = new Game({
        location : 'sample location'
      });
      expect(game.location).toEqual('sample location');
    }));

    it('should have a time', inject(function(Game){
      var game = new Game({
        time : 'sample time'
      });
      expect(game.time).toEqual('sample time');
    }));

    it('should have a score', inject(function(Game){
      var game = new Game({
        score : 'sample score'
      });
      expect(game.score).toEqual('sample score');
    }));

    it('should have a day', inject(function(Game){
      var game = new Game({
        day : 'sample day'
      });
      expect(game.day).toEqual('sample day');
    }));
  });

  describe('Score', function(){
    it('should have a home team score', inject(function(Score){
      var score = new Score({
        home : 2
      });
      expect(score.home).toEqual(2);
    }));

    it('should have an away team score', inject(function(Score){
      var score = new Score({
        away : 4
      });
      expect(score.away).toEqual(4);
    }));
  });

  describe('JoinTeamInvitation', function(){
    it('should have a team to which it responds', inject(function(JoinTeamInvitation){
      var invitation = new JoinTeamInvitation({
        team : 'sample team'
      });
      expect(invitation.team).toEqual('sample team');
    }));

    it('should have a player who responds', inject(function(JoinTeamInvitation){
      var invitation = new JoinTeamInvitation({
        player : 'sample player'
      });
      expect(invitation.player).toEqual('sample player');
    }));
  });

  describe('Player', function(){
    it('should have an id', inject(function(Player){
      var player = new Player({
        id : 1
      });
      expect(player.id).toEqual(1);
    }));

    it('should have a name', inject(function(Player){
      var player = new Player({
        name : 'sample name'
      });
      expect(player.name).toEqual('sample name');
    }));

    it('should have positions', inject(function(Player){
      var player = new Player({
        positions : 'sample positions'
      });
      expect(player.positions).toEqual('sample positions');
    }));

    it('should have a function called available which indicates if is available to play', inject(function(Player){
      var player = new Player({
        available : true
      });
      expect(player.available()).toEqual(true);
    }));

    it('should have a number for the t-shirt', inject(function(Player){
      var player = new Player({
        number : 'sample number'
      });
      expect(player.number).toEqual('sample number');
    }));
  });

  describe('Position', function(){
    it('should have an id', inject(function(Position){
      var position = new Position({
        id : 1
      });
      expect(position.id).toEqual(1);
    }));

    it('should have a label', inject(function(Position){
      var position = new Position({
        label : 'sample label'
      });
      expect(position.label).toEqual('sample label');
    }));
  });

  describe('Company', function(){
    it('should have an id', inject(function(Company){
      var company = new Company({
        id : 1
      });
      expect(company.id).toEqual(1);
    }));

    it('should have a location', inject(function(Company){
      var company = new Company({
        location : 'sample location'
      });
      expect(company.location).toEqual('sample location');
    }));

    it('should have fields', inject(function(Company){
      var company = new Company({
        fields : 'sample fields'
      });
      expect(company.fields).toEqual('sample fields');
    }));

    it('should have a name', inject(function(Company){
      var company = new Company({
        name : 'sample name'
      });
      expect(company.name).toEqual('sample name');
    }));
  });

  describe('Field', function(){
    it('should have an id', inject(function(Field){
      var field = new Field({
        id : 1
      });
      expect(field.id).toEqual(1);
    }));

    it('should have a name', inject(function(Field){
      var field = new Field({
        name : 'sample name'
      });
      expect(field.name).toEqual('sample name');
    }));

    it('should have a size', inject(function(Field){
      var field = new Field({
        size : 'sample size'
      });
      expect(field.size).toEqual('sample size');
    }));

    it('should have a company', inject(function(Field){
      var field = new Field({
        company : 'sample company'
      });
      expect(field.company).toEqual('sample company');
    }));
  });

  describe('GamePost', function(){
    it('should have an id', inject(function(GamePost){
      var post = new GamePost({
        id : 1
      });
      expect(post.id).toEqual(1);
    }));

    it('should have a field where the game will take place', inject(function(GamePost){
      var post = new GamePost({
        field : 'sample field'
      });
      expect(post.field).toEqual('sample field');
    }));

    it('should have a team that starts the post', inject(function(GamePost){
      var post = new GamePost({
        team : 'sample team'
      });
      expect(post.team).toEqual('sample team');
    }));

    it('should have a day', inject(function(GamePost){
      var post = new GamePost({
        day : 'sample day'
      });
      expect(post.day).toEqual('sample day');
    }));

    it('should have a time', inject(function(GamePost){
      var post = new GamePost({
        time : 'sample time'
      });
      expect(post.time).toEqual('sample time');
    }));
  });

  describe('PlayerPost', function(){
    it('should have an id', inject(function(PlayerPost){
      var post = new PlayerPost({
        id : 1
      });
      expect(post.id).toEqual(1);
    }));

    it('should have a number showing how many players are needed', inject(function(PlayerPost){
      var post = new PlayerPost({
        playersNeeded : 5
      });
      expect(post.playersNeeded).toEqual(5);
    }));

    it('should have a team that neededs players', inject(function(PlayerPost){
      var post = new PlayerPost({
        team : 'sample team'
      });
      expect(post.team).toEqual('sample team');
    }));

    it('should have a field where the game will take place', inject(function(PlayerPost){
      var post = new PlayerPost({
        field : 'sample field'
      });
      expect(post.field).toEqual('sample field');
    }));

    it('should have a day', inject(function(PlayerPost){
      var post = new PlayerPost({
        day : 'sample day'
      });
      expect(post.day).toEqual('sample day');
    }));

    it('should have a time', inject(function(PlayerPost){
      var post = new PlayerPost({
        time : 'sample time'
      });
      expect(post.time).toEqual('sample time');
    }));
  });

  describe('PlayGameInvitation', function(){
    it('should have an id', inject(function(PlayGameInvitation){
      var post = new PlayGameInvitation({
        id : 1
      });
      expect(post.id).toEqual(1);
    }));

    it('should have a game post to which the team answers', inject(function(PlayGameInvitation){
      var post = new PlayGameInvitation({
        gamePost : 'sample game post'
      });
      expect(post.gamePost).toEqual('sample game post');
    }));

    it('should have a team that answers the game post', inject(function(PlayGameInvitation){
      var post = new PlayGameInvitation({
        team : 'sample team'
      });
      expect(post.team).toEqual('sample team');
    }));
  });
});
