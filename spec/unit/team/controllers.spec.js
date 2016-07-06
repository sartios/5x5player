describe('Controllers', function(){

  beforeEach(module('app'));

  var mockTeam;

  beforeEach(module(function($provide){
    $provide.factory('TeamService', function($q, Team){
      var mock = {};
      mock.sampleTeams = [];
        mockTeam = new Team({
         id: 1,
         name: 'Sample Team'
       });
      mock.sampleTeams.push(mockTeam);
      mock.create = function(team){};
      mock.delete = function(team){};
      mock.getAll = function(){
        return mock.sampleTeams;
      };

      return mock;
    });
  }));

  describe('TeamListController', function(){
    var location, teamService, $scope;
    beforeEach(inject(function($rootScope,$controller,$location,TeamService){
      $scope = $rootScope.$new();
      location = $location;
      teamService = TeamService;
      $controller('TeamListController', {
        $scope: $scope
      });

      spyOn(location,'path');
      spyOn(teamService, 'delete');
    }));

    it('should view a team', function(){
      var team={};
      team.id = 1;
      $scope.viewTeam(team);
      expect(location.path).toHaveBeenCalledWith('/team/view/' + team.id);
    });

    it('should edit a team', function(){
      var team = {};
      team.id = 1;
      $scope.editTeam(team);
      expect(location.path).toHaveBeenCalledWith('/team/edit/' + team.id);
    });

    it('should delete a team', function(){
      team = {};
      team.id = 1;
      $scope.deleteTeam(team);
      expect(teamService.delete).toHaveBeenCalledWith( team.id);
    });

    it('should add a new team', function(){
      $scope.addTeam();
      expect(location.path).toHaveBeenCalledWith('/team/new');
    });

    it('should view all teams', function(){
      expect($scope.teams[0]).toEqual(mockTeam);
    });
  });

  describe('TeamCreateController', function(){
    var location, teamService, $scope;
    beforeEach(inject(function($rootScope,$controller,$location,TeamService,Team){
      $scope = $rootScope.$new();
      location = $location;
      teamService = TeamService;
      $controller('TeamCreateController', {
        $scope: $scope
      });

      spyOn(location,'path');
      spyOn(teamService, 'create').and.returnValue({name: 'Sample Team'});
    }));

    it('should create a team', function(){
      $scope.formNewTeam = {name: 'Sample Team'};
      $scope.createTeam();
      expect(teamService.create).toHaveBeenCalledWith($scope.formNewTeam);
      expect(location.path).toHaveBeenCalledWith('/teams');
    });

    it('should not create a null team', function(){
      $scope.createTeam();
      expect(teamService.create).not.toHaveBeenCalledWith($scope.formNewTeam);
      expect(location.path).not.toHaveBeenCalledWith('/teams');
    });
  });

});
