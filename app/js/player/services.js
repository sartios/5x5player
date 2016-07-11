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
        positions: PositionService.getByLabel('Defence'),
        available: true,
        number: 9
      }));

      players.push(new Player({
        id: players.length + 1,
        name: 'Player 2',
        positions: PositionService.getByLabel('Offense'),
        available: false,
        number: 7
      }));

      players.push(new Player({
        id: players.length + 1,
        name: 'Player 3',
        positions: PositionService.getByLabel('Goalkeeper'),
        available: false,
        number: 1
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
      var results = positions.filter(function(position){
        return position.id == positionId;
      });
      return (results.length > 0)?results[0]:undefined;
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

angular.module('player')
  .factory('PlayerPostService', ['PlayerPost','TeamService','FieldService',
  function(PlayerPost, TeamService, FieldService){

    var service = {};
    var playerPosts = [];


    service.create = function(playerPost){
      if(playerPost.team&&playerPost.playersNeeded){
        playerPost.id = playerPosts.length + 1;
        playerPosts.push(angular.copy(playerPost));
      }else{
        console.log('Please check team or playersNeeded');
      }
      return playerPost;
    };

    service.update = function(playerPost){
    	if(playerPost.team&&playerPost.playersNeeded){
	      angular.forEach(playerPosts, function(e, index){
	        if(e.id === playerPost.id){
	          playerPosts[index] = playerPost;
	        }
	      });
  		}
    	return playerPost;
    };

    service.delete = function(playerPostId){
        var postIndex;
        angular.forEach(playerPosts, function(e, index){
          if(e.id == playerPostId){
            postIndex = index;
          }
        });

        if(postIndex >= 0) playerPosts.splice(postIndex, 1);
    };

    service.getAll = function(){
    	return playerPosts;
    }

    service.getById = function(postId){
    	var post;
    	angular.forEach(playerPosts, function(e, index){
    		if(e.id == postId){
    			post = angular.copy(playerPosts[index]);
    		}
    	});
    	return post;
    };

    service.getFuturePlayerPosts = function(location){
      var locationPosts = playerPosts.filter(function(post){
        return post.team.location == location;
      }),
      currentDate = new Date();

      return locationPosts.filter(function(post){
      	var date = post.day.split('/'),
      	time = post.time.split(':'),
      	timeIsOk;
      	
      	if(time[0] > currentDate.getHours()){
      		timeIsOk = true;
      	}else if(time[0] == currentDate.getHours()){
      		timeIsOk = time[1] >= currentDate.getMinutes();
      	}
      	
      	return (date[0] >= currentDate.getDate())
      		&&(date[1] >= currentDate.getMonth() + 1)
      		&&(date[2] >= currentDate.getFullYear()) 
      		&&timeIsOk;
      });
    };

    var initPlayerPosts = function(){
      playerPosts.push(new PlayerPost({
        id: 1,
        team: TeamService.get(1),
        field: FieldService.getById(1),
        playersNeeded: 2,
        day: '25/07/2016',
        time: '21:00'
      }));

      playerPosts.push(new PlayerPost({
        id: 2,
        team: TeamService.get(1),
        field: FieldService.getById(1),
        playersNeeded: 4,
        day: '25/07/2016',
        time: '21:00'
      }));
    };

    var init = function(){
      initPlayerPosts();
    };

    init();

    return service;
  }]);
