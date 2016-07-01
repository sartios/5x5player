angular.module('team')
  .factory('GameService', ['Game','Score', 'Team',
    function(Game, Score, Team){

    var service = {};
    var games=[];

    service.create = function(game){
      console.log('create('+game+')');
      if(game.awayTeam&&game.homeTeam){
        games.push(game);
        return game;
      }
    };

    service.update = function(game){
      angular.forEach(games, function(e, index){
        if(e.id === game.id){
          games[index] = game;
        }
      });
      return game;
    };

    service.delete = function(gameId){
      var gameIndex;
      angular.forEach(games, function(e, index){
        if(e.id === gameId){
          gameIndex = index;
        }
      });
      if(gameIndex >=0) games.splice(gameIndex, 1);
    };

    service.get = function(gameId){
      var game;
      angular.forEach(games, function(e, index){
        if(e.id == gameId){
          game = angular.copy(games[index]);
        }
      });
      return game;
    };

    service.getAll = function(){
      return games;
    };

    service.getHomeGames = function(teamId){
      console.log('getHomeGames('+teamId+')');
      var myGames = [], game;
      angular.forEach(games, function(e, index){
        if(e.homeTeam.id == teamId){
          game = angular.copy(games[index]);
          myGames.push(game);
        }
      });
      return myGames;
    };

    service.getAwayGames = function(teamId){
      console.log('getAwayGames('+teamId+')');
      var myGames = [], game;
      angular.forEach(games, function(e, index){
        if(e.awayTeam.id == teamId){
          game = angular.copy(games[index]);
          myGames.push(game);
        }
      });
      return myGames;
    };

    service.getFutureGames = function(){
      return games.filter(function(cur){
        return cur.score === undefined;
      });
    };

    var setupInitialGames = function(){

      games.push(new Game({
        id : 1,
        homeTeam : new Team({
          id: 1,
          name: 'Team 1'
        }),
        awayTeam : new Team({
          id: 2,
          name: 'Team 2'
        }),
        location : 'Field 4',
        time : '21:00',
        score : new Score({
          home: 2,
          away: 4
        })
      }));

      games.push(new Game({
        id : 1,
        homeTeam : new Team({
          id: 1,
          name: 'Team 1'
        }),
        awayTeam : new Team({
          id: 2,
          name: 'Team 2'
        }),
        location : 'Field 2',
        time : '21:00',
        score : new Score({
          home: 6,
          away: 2
        })
      }));

      games.push(new Game({
        id : 1,
        homeTeam : new Team({
          id: 2,
          name: 'Team 2'
        }),
        awayTeam : new Team({
          id: 1,
          name: 'Team 1'
        }),
        location : 'Field 2',
        time : '21:00',
        score : new Score({
          home: 9,
          away: 4
        })
      }));

      games.push(new Game({
        id : 1,
        homeTeam : new Team({
          id: 1,
          name: 'Team 1'
        }),
        awayTeam : new Team({
          id: 3,
          name: 'Team 3'
        }),
        location : 'Field 1',
        time : '21:00',
        score : new Score({
          home: 15,
          away: 10
        })
      }));

      games.push(new Game({
        id : 1,
        homeTeam : new Team({
          id: 3,
          name: 'Team 3'
        }),
        awayTeam : new Team({
          id: 2,
          name: 'Team 2'
        }),
        location : 'Field 3',
        time : '21:00',
        score : new Score({
          home: 8,
          away: 3
        })
      }));

      games.push(new Game({
        id : 1,
        homeTeam : new Team({
          id: 2,
          name: 'Team 2'
        }),
        awayTeam : new Team({
          id: 1,
          name: 'Team 1'
        }),
        location : 'Field 2',
        time : '21:00',
        score : new Score({
          home: 7,
          away: 9
        })
      }));
    };

    var init = function(){
      setupInitialGames();
    };
    init();

    return service;
  }]);

angular.module('team')
  .factory('GamePostService', ['GamePost','Team','Field','TeamService','FieldService',
  function(GamePost, Team, Field, TeamService, FieldService){

    var service = {};
    var gamePosts = [];


    service.create = function(gamePost){
      if(gamePost.team&&gamePost.field){
        gamePost.id = gamePosts.length + 1;
        gamePosts.push(gamePost);
      }
      return gamePosts;
    };

    service.update = function(gamePost){
      angular.forEach(gamePosts, function(post, index){
        if(post.id === gamePost.id){
          gamePosts[index] = post;
        }
      });
      return gamePost;
    };

    service.delete = function(gamePostId){
      var postIndex;
      angular.forEach(gamePosts, function(post, index){
        if(post.id == gamePostId){
          postIndex = index;
        }
      });
      if(postIndex>=0) gamePosts.splice(postIndex, 1);
    };

    service.getFutureGamePosts = function(teamId, location){
      var posts = gamePosts.filter(function(post){
        return post.team.location == location;
      });

      console.log('Found ' + posts.length + ' game posts in ' + location);

      return posts.filter(function(post){
        return post.team.id != teamId;
      });
    };


    var initGamePostings = function(){
      gamePosts.push(new GamePost({
        id: 1,
        team: TeamService.get(1),
        field: FieldService.getById(1),
        day: '29/10/2016',
        time: '21:00'
      }));

      gamePosts.push(new GamePost({
        id: 2,
        team: TeamService.get(1),
        field: FieldService.getById(2),
        day: '29/10/2016',
        time: '21:00'
      }));

      gamePosts.push(new GamePost({
        id: 3,
        team: TeamService.get(1),
        field: FieldService.getById(1),
        day: '29/10/2016',
        time: '21:00'
      }));

      gamePosts.push(new GamePost({
        id: 4,
        team: TeamService.get(2),
        field: FieldService.getById(2),
        day: '29/10/2016',
        time: '21:00'
      }));

      gamePosts.push(new GamePost({
        id: 5,
        team: TeamService.get(2),
        field: FieldService.getById(1),
        day: '29/10/2016',
        time: '21:00'
      }));

      gamePosts.push(new GamePost({
        id: 6,
        team: TeamService.get(2),
        field: FieldService.getById(2),
        day: '29/10/2016',
        time: '21:00'
      }));

      gamePosts.push(new GamePost({
        id: 7,
        team: TeamService.get(1),
        field: FieldService.getById(1),
        day: '29/10/2016',
        time: '21:00'
      }));
    };


    var init = function(){
      initGamePostings();
    };

    init();

    return service;
  }]);
