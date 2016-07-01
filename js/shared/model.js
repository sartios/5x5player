angular.module('app')
  .factory('Team', function(){
    function Team(args){
      this.id = args.id,
      this.name = args.name,
      this.location = args.location,
      this.players = args.players,
      this.level = args.level
    }

    return Team;
  });

angular.module('app')
  .factory('Game', function(){
    function Game(args){
      this.id = args.id,
      this.homeTeam = args.homeTeam,
      this.awayTeam = args.awayTeam,
      this.location = args.location,
      this.time = args.time,
      this.score = args.score
    }
    return Game
  });

angular.module('app')
  .factory('Score', function(){
    function Score(args){
      this.home = args.home,
      this.away = args.away
    }
    return Score;
  });

angular.module('app')
  .factory('JoinTeamInvitation', function(){
    function JoinTeamInvitation(args){
      this.team = args.team,
      this.player = args.player
    }
    return JoinTeamInvitation;
  });

angular.module('app')
  .factory('Player', function(){
    function Player(args){
      this.id = args.id,
      this.name = args.name,
      this.positions = args.positions,
      this.available = function(){
        return args.available;
      },
      this.number = args.number
    }
    return Player;
  });

angular.module('app')
  .factory('Position', function(){
    function Position(args){
      this.id = args.id,
      this.label = args.label
    }
    return Position;
  });

angular.module('app')
  .factory('Company', function(){
    function Company(args){
      this.id = args.id,
      this.location = args.location,
      this.fields = args.fields,
      this.name = args.name
    }
    return Company;
  });

angular.module('app')
  .factory('Field', function(){
    function Field(args){
      this.id = args.id,
      this.name = args.name,
      this.size = args.size,
      this.company = args.company
    }
    return Field;
  });

angular.module('app')
  .factory('GamePost', function(){
    function GamePost(args){
      this.id = args.id,
      this.field = args.field,
      this.team = args.team,
      this.day = args.day,
      this.time = args.time
    }
    return GamePost;
  });

angular.module('app')
  .factory('PlayerPost', function(){
    function PlayerPost(args){
      this.id = args.id,
      this.playersNeeded = args.playersNeeded,
      this.team = args.team,
      this.field = args.field,
      this.day = args.day,
      this.time = args.time
    }
    return PlayerPost;
  });

angular.module('app')
  .factory('PlayGameInvitation', function(){
    function PlayGameInvitation(args){
      this.id = args.id,
      this.gamePost = args.gamePost,
      this.team = args.team
    }
    return PlayGameInvitation;
  });
