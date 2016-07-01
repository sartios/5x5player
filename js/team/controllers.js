angular.module('team').controller('TeamListController', ['$scope','$location','TeamService',
 function($scope,$location,TeamService){

   $scope.viewTeam = function(team){
     console.log('viewTeam()');
     $location.path('/team/view/'+ team.id);
   };

  $scope.editTeam = function(team){
    console.log('editTeam()');
    $location.path('/team/edit/' + team.id);
  };

  $scope.deleteTeam = function(team){
    console.log('deleteTeam('+team.id+')');
    TeamService.delete(team.id);
    $location.path('/teams');
  };

  $scope.addTeam = function(){
    $location.path('/team/new');
  }

  var init = function(){
    $scope.teams = TeamService.getAll();
  };

  init();
}]);

angular.module('team').controller('TeamCreateController', ['$scope','TeamService','$location',
 function($scope, TeamService, $location){

  $scope.createTeam = function(){
    console.log('createTeam()');
    var team = $scope.formNewTeam;
    team.players = [];
    team.id = TeamService.getAll().length + 1;
    team = TeamService.create(team);
    console.log(team);
    if(team){
      $location.path('/teams');
    }
  };

  var init = function(){
  };
  init();
}]);

angular.module('team').controller('TeamEditController', ['$scope','$location','$routeParams','TeamService','selectedTeam',
 function($scope,$location, $routeParams, TeamService, selectedTeam){

  $scope.updateTeam = function(){
    console.log('updateTeam()');
    var team = $scope.selectedTeam;
    team.players = [];
    console.log(team);
    team = TeamService.update(team);
    if(team){
      $location.path('/teams');
    }
  };

  var init = function(){
    $scope.name = TeamService.get($routeParams.id).name;
    if(selectedTeam){
      $scope.selectedTeam = selectedTeam;
    }
  };
  init();
}]);

angular.module('team')
  .controller('TeamViewController',['$scope', '$location', 'selectedTeam','PlayerPostService','FieldService',
  function($scope, $location, selectedTeam, PlayerPostService, FieldService){

    $scope.update = function(){
      var post = $scope.post;
      post.team = $scope.team;
      post.field = FieldService.getById(post.field.id);
      PlayerPostService.create(post);
      $location.path('/home');
    };

    var init = function(){
      $scope.team = selectedTeam;
    };

    init();

  }]);
