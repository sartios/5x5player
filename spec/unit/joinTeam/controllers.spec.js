describe("controller:JoinTeamInvitationController", function(){

  beforeEach(module('app'));

  var $scope, ctrl, invitationService,
  teamService, $routeParams={}, mockTeam, mockInvitation;

  beforeEach(module(function($provide){
    $provide.factory('JoinTeamInvitationService', function(){
      var mock = {};
      mockInvitation = {name:'sample invitation'};
      mock.delete = function(invitation){};
      mock.getByTeam = function(id){return [mockTeam];};
      return mock;
    });

    $provide.factory('TeamService', function(){
      var mock = {};
      mockTeam = {name:'sample team', players: []};
      mock.get = function(id){return mockTeam;};
      mock.update = function(team){return team;};
      return mock;
    });
  }));

  beforeEach(inject(function($rootScope, JoinTeamInvitationService, TeamService, $controller){
        $scope = $rootScope.$new();
        $routeParams.id = 1;
        invitationService = JoinTeamInvitationService;
        teamService = TeamService;
        ctrl = $controller('JoinTeamInvitationController',{
          $scope : $scope,
          $routeParams :  $routeParams,
          JoinTeamInvitationService : invitationService,
          TeamService : teamService
        });

        spyOn(TeamService, 'get').and.callThrough();
        spyOn(TeamService, 'update').and.callThrough();
        spyOn(JoinTeamInvitationService, 'delete').and.callThrough();
        spyOn(JoinTeamInvitationService, 'getByTeam').and.callThrough();
  }));

  it('should define a controller', function(){
    expect(ctrl).toBeDefined();
    expect($scope.invitations).toEqual([mockTeam]);
  });

  it('should accept the join team invitation', inject(function(JoinTeamInvitation){
    var invitation = new JoinTeamInvitation({
      team : {
        id : 1
      },
      player : {
        id : 1
      }
    });
    mockTeam.players = [];
    mockTeam.players.push(invitation.player.id);
    $scope.accept(invitation);
    expect(teamService.get).toHaveBeenCalledWith(invitation.team.id);
    expect(teamService.update).toHaveBeenCalledWith(mockTeam);
    expect(invitationService.delete).toHaveBeenCalledWith(invitation);
    expect(invitationService.getByTeam).toHaveBeenCalledWith(1);
    expect($scope.invitations).toEqual([mockTeam]);
  }));

  it('should reject the join team invitation', inject(function(JoinTeamInvitation){
    var invitation = new JoinTeamInvitation({
      team : {
        id : 1
      },
      player : {
        id : 1
      }
    });
    $scope.reject(invitation);
    expect(invitationService.delete).toHaveBeenCalledWith(invitation);
    expect(invitationService.getByTeam).toHaveBeenCalledWith(1);
    expect($scope.invitations).toEqual([mockTeam]);
  }));
});
