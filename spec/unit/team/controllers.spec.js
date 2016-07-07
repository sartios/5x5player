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
      mock.get = function(id){return mock.sampleTeams[0];};
      mock.update = function(team){return team;};
      mock.getAll = function(){return mock.sampleTeams;};

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

  describe('TeamEditController', function(){
    var location, teamService, $scope, selectedTeam;
    beforeEach(inject(function($rootScope,$controller,$location,TeamService,Team){
      $scope = $rootScope.$new();
      selectedTeam = mockTeam;
      teamService = TeamService;
      location = $location;
      $controller('TeamEditController',{
        $scope : $scope,
        selectedTeam : selectedTeam,
        $routeParams: {id : '1'}
      });

      spyOn(teamService, 'get').and.callThrough();
      spyOn(teamService, 'update').and.callThrough();
      spyOn(location, 'path');
    }));

    it('should have a team', function(){
      expect($scope.name).toEqual(mockTeam.name);
      expect($scope.selectedTeam).toEqual(mockTeam);
    });

    it('should update a team', function(){
      $scope.updateTeam();
      expect(teamService.update).toHaveBeenCalledWith($scope.selectedTeam);
      expect(location.path).toHaveBeenCalledWith('/teams');
    });

    it('should not update a null team', function(){
      $scope.selectedTeam = undefined;
      $scope.updateTeam();
      expect(teamService.update).not.toHaveBeenCalledWith($scope.selectedTeam);
      expect(location.path).not.toHaveBeenCalledWith('/teams');
    });

    it('should not have an undefined team', function(){
      expect($scope.name).toEqual(mockTeam.name);
      expect($scope.selectedTeam).toEqual(mockTeam);
    });

  });

  describe('TeamViewController', function(){
    var $scope, location, selectedTeam,
    playerPostService, fieldService, playGameInvitationService,
    JoinTeamInvitationService, companyService, companies, field, spy;
    beforeEach(module(function($provide){
      $provide.factory('PlayerPostService', function(){
        var mock = {};
        mock.create = function(post){return post;};
        return mock;
      });

      $provide.factory('FieldService', function(){
        var mock = {};
        field = {id : 1};
        mock.getById = function(id){return field;};
        return mock;
      });

      $provide.factory('PlayGameInvitationService', function(){
        var mock = {};
        mock.getTeamInvitations = function(id){return [{id: 1}];};
        return mock;
      });

      $provide.factory('JoinTeamInvitationService', function(){
        var mock = {};
        mock.getByTeam = function(id){return [{id: 1}];};
        mock.getAll = function(){return [{id: 1}];};
        return mock;
      });

      $provide.factory('CompanyService', function(){
        var mock = {};
        companies = [];
        companies.push({id: 1});
        mock.getAll = function(){return companies;};
        return mock;
      });
    }));

    beforeEach(inject(
      function($rootScope, $location, $controller, PlayerPostService,
            FieldService, PlayGameInvitationService, JoinTeamInvitationService, CompanyService){
          $scope = $rootScope.$new();
          selectedTeam = mockTeam;
          playerPostService = PlayerPostService;
          fieldService = FieldService;
          playGameInvitationService = PlayGameInvitationService;
          joinTeamInvitationService = JoinTeamInvitationService;
          companyService = CompanyService;
          location = $location;
          $controller('TeamViewController',{
            $scope : $scope,
            selectedTeam : selectedTeam
          });

          spyOn(fieldService,'getById').and.callThrough();
          spyOn(playerPostService,'create').and.callThrough();
          spyOn(playGameInvitationService,'getTeamInvitations').and.callThrough();
          spyOn(joinTeamInvitationService,'getByTeam').and.callThrough();
          spyOn(companyService,'getAll').and.callThrough();
          spyOn(location, 'path');
    }));

    it('should have selected team', function(){
      expect($scope.team).toEqual(selectedTeam);
    });

    it('should have play game invitations', function(){
      expect($scope.playGameInvitations).toEqual(1);
    });

    it('should have player invitations', function(){
      expect($scope.playerInvitations).toEqual(1);
    });

    it('should have available companies', function(){
        expect($scope.companies).toEqual(companies);
    });

    it('should create a player post', function(){
      $scope.post = {id : 1, field : field};
      $scope.team = {id : 1};
      var post = $scope.post;
      post.team = $scope.team;
      post.field = field;
      $scope.update();
      expect(fieldService.getById).toHaveBeenCalledWith(1);
      expect(playerPostService.create).toHaveBeenCalledWith(post);
      expect(location.path).toHaveBeenCalledWith('/home');
    });

    it('should not create an undefined player post', function(){
      $scope.post = undefined;
      $scope.team = {id : 1};
      $scope.update();
      expect(fieldService.getById).not.toHaveBeenCalledWith(1);
      expect(playerPostService.create).not.toHaveBeenCalled();
      expect(location.path).not.toHaveBeenCalledWith('/home');
    });

    it('should not create an undefined team player post', function(){
      $scope.post = {id : 1, field : field};
      $scope.team = undefined;
      $scope.update();
      expect(fieldService.getById).not.toHaveBeenCalledWith(1);
      expect(playerPostService.create).not.toHaveBeenCalled();
      expect(location.path).not.toHaveBeenCalledWith('/home');
    });

    it('should not create an undefined field player post', function(){
      $scope.post = {id : 1, field : {}};
      $scope.team = {id : 1};
      fieldService.getById.and.returnValue(false);
      $scope.update();
      expect(fieldService.getById).not.toHaveBeenCalledWith(1);
      expect(playerPostService.create).not.toHaveBeenCalled();
      expect(location.path).not.toHaveBeenCalledWith('/home');
    });

    it('should view play game invitations', function(){
      $scope.viewPlayGameInvitations();
      expect(location.path).toHaveBeenCalledWith('/play-game-invitations/' + selectedTeam.id);
    });
  });

});
