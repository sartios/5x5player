describe("controller:HomeController", function(){
  var scope,gamePostService,playerPostService,joinTeamInvitation,
  joinTeamInvitationService,teamService,playerService,
  playGameInvitationService,playGameInvitation,
  gamePost, playerPost,
  playGameInvitations=[], joinTeamInvitations=[];

  beforeEach(module('app'));

  beforeEach(inject(function($controller, PlayGameInvitation, JoinTeamInvitation){
    scope = {};
    gamePost = {id: 1};
    gamePostService = {getFutureGamePosts: function(teamId, location){return [gamePost];}};
    //spyOn(gamePostService, 'getFutureGamePosts').and.returnValue(gamePost);
    playerPost = {id: 1};
    playerPostService = {getFuturePlayerPosts: function(location){return [playerPost];}};
    //spyOn(playerPostService, 'getFuturePlayerPosts').and.returnValue(playerPost);
    joinTeamInvitationService = {create: function(invitation){
      joinTeamInvitations.push("1");
      return {};
    }};
    teamService = {get: function(id){}};
    playerService = {getById: function(id){}};
    playGameInvitationService = {create: function(invitation){
      playGameInvitations.push("1");
      return {};
    }};


    $controller('HomeController', {
      $scope: scope,
      GamePostService: gamePostService,
      PlayerPostService: playerPostService,
      JoinTeamInvitation: JoinTeamInvitation,
      JoinTeamInvitationService: joinTeamInvitationService,
      TeamService: teamService,
      PlayerService: playerService,
      PlayGameInvitationService: playGameInvitationService,
      PlayGameInvitation: PlayGameInvitation
    });
  }));

  it('should have game post(-s)', function(){
    expect(scope.gamePosts[0]).toEqual(gamePost);
  });

  it('should have player post(-s)', function(){
    expect(scope.playerPosts[0]).toEqual(playerPost);
  });

  it('should create a play game request', function(){
    scope.play({});
    expect(playGameInvitations.length).toEqual(1);
  });

  it('should create a join team to play request', function(){
    scope.join({});
    expect(joinTeamInvitations.length).toEqual(1);
  });

});
