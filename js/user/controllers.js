angular.module('user')
  .controller('HomeController', ['$scope','GamePostService',
  function($scope,GamePostService){

    var teamId;
    var location;

    var initCityGamePostings = function(){
      $scope.posts = GamePostService.getFutureGamePosts(teamId, location);
      console.log('Found ' + $scope.posts.length + ' posts');
    };

    $scope.play = function(){
      console.log('play()');
    };

    var init = function(){
      teamId = 5;
      location = 'City 1';
      initCityGamePostings();
    };

    init();
  }]);
