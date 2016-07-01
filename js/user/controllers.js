angular.module('user')
  .controller('HomeController', ['$scope','GamePostService','PlayerPostService',
  'JoinTeamInvitation','JoinTeamInvitationService','TeamService','PlayerService',
  function($scope,GamePostService, PlayerPostService,
    JoinTeamInvitation, JoinTeamInvitationService, TeamService, PlayerService){

    var teamId;
    var location;
    var playerId;

    var initCityGamePostings = function(){
      $scope.gamePosts = GamePostService.getFutureGamePosts(teamId, location);
      console.log('Found ' + $scope.gamePosts.length + ' game posts');
    };

    var initPlayerPostings = function(){
      $scope.playerPosts = PlayerPostService.getFuturePlayerPosts(location);
      console.log('Found ' + $scope.playerPosts.length + ' player posts');
    };

    $scope.play = function(post){
      
    };

    $scope.join = function(post){
      var team = TeamService.get(teamId);
      var player = PlayerService.getById(playerId);
      var invitation = JoinTeamInvitationService.create(new JoinTeamInvitation({
        team: team,
        player: player
      }));
      post.joined = true;
      console.log(invitation);
    };

    var init = function(){
      teamId = 3;
      location = 'City 1';
      playerId = 1;
      initCityGamePostings();
      initPlayerPostings();
    };

    init();
  }]);
