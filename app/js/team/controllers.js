angular.module('team').controller('TeamListController', ['$scope', '$location', 'TeamService',
    function($scope, $location, TeamService) {

        $scope.viewTeam = function(team) {
            console.log('viewTeam()');
            $location.path('/team/view/' + team.id);
        };

        $scope.editTeam = function(team) {
            console.log('editTeam()');
            $location.path('/team/edit/' + team.id);
        };

        $scope.deleteTeam = function(team) {
            console.log('deleteTeam(' + team.id + ')');
            TeamService.delete(team.id);
            $location.path('/teams');
        };

        $scope.addTeam = function() {
            $location.path('/team/new');
        };

        var init = function() {
            $scope.teams = TeamService.getAll();
        };

        init();
    }
]);

angular.module('team').controller('TeamCreateController', ['$scope', '$location', 'TeamService',
    function($scope, $location, TeamService) {

        $scope.createTeam = function() {
            console.log('createTeam()');
            var team = $scope.formNewTeam;
            if (team) {
                team.players = [];
                team = TeamService.create(team);
                if (team) {
                    $location.path('/teams');
                }
            }
        };

        var init = function() {};
        init();
    }
]);

angular.module('team').controller('TeamEditController', ['$scope', '$location', '$routeParams', 'TeamService', 'selectedTeam',
    function($scope, $location, $routeParams, TeamService, selectedTeam) {

        $scope.updateTeam = function() {
            console.log('updateTeam()');
            var team = $scope.selectedTeam;
            if (team) {
                team.players = [];
                team = TeamService.update(team);
                if (team) {
                    $location.path('/teams');
                }
            }
        };

        var init = function() {
            $scope.name = TeamService.get($routeParams.id).name;
            if (selectedTeam) {
                $scope.selectedTeam = selectedTeam;
            }
        };
        init();
    }
]);

angular.module('team')
    .controller('TeamViewController', ['$scope', '$location', 'selectedTeam', 'PlayerPostService', 'FieldService',
        'PlayGameInvitationService', 'JoinTeamInvitationService', 'CompanyService',
        function($scope, $location, selectedTeam, PlayerPostService,
            FieldService, PlayGameInvitationService, JoinTeamInvitationService, CompanyService) {

            $scope.update = function() {
                var post = $scope.post;
                if (post) {
                    var team = $scope.team;
                    if (team) {
                        post.team = team;
                        var field = FieldService.getById(post.field.id);
                        if(field){
                            post.field = field;
                            PlayerPostService.create(post);
                            $location.path('/home');
                        }
                    }
                }
            };

            $scope.viewPlayGameInvitations = function() {
                $location.path('/play-game-invitations/' + selectedTeam.id);
            };

            var initPlayGameInvitations = function() {
                var invitations = PlayGameInvitationService.getTeamInvitations(selectedTeam.id);
                $scope.playGameInvitations = invitations.length;
            };

            var initPlayerInvitations = function() {
                var invitations = JoinTeamInvitationService.getByTeam(selectedTeam.id);
                $scope.playerInvitations = invitations.length;
            };

            var initAvailableCompanies = function() {
                $scope.companies = CompanyService.getAll();
            };

            var init = function() {
                $scope.team = selectedTeam;
                initPlayGameInvitations();
                initPlayerInvitations();
                initAvailableCompanies();
            };

            init();

        }
    ]);
