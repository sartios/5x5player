angular.module('user')
  .controller('HomeController', ['$scope','GamePostService','PlayerPostService',
  function($scope,GamePostService, PlayerPostService){

    var teamId;
    var location;

    var initCityGamePostings = function(){
      $scope.gamePosts = GamePostService.getFutureGamePosts(teamId, location);
      console.log('Found ' + $scope.gamePosts.length + ' game posts');
    };

    var initPlayerPostings = function(){
      $scope.playerPosts = PlayerPostService.getFuturePlayerPosts(location);
      console.log('Found ' + $scope.playerPosts.length + ' player posts');
    };

    $scope.play = function(){
      console.log('play()');
    };

    var init = function(){
      teamId = 5;
      location = 'City 1';
      initCityGamePostings();
      initPlayerPostings();
    };

    init();
  }]);
