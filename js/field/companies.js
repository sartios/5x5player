angular.module('field')
  .controller('CompanyListController', ['$scope', 'CompanyService',
  function($scope, CompanyService){

    var init = function(){
      $scope.companies = CompanyService.getAll();
    };

    init();
  }]);
