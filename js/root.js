angular.module('app')
  .controller('RootController', ['$scope', function($scope){


    $scope.$on('$routeChangeSuccess', function (e, current,previous) {
        $scope.currentRoute = current;
    });
  }]);
