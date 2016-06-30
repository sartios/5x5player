angular.module('field')
  .controller('CompanyListController', ['$scope','$location', 'CompanyService',
  function($scope,$location, CompanyService){

    $scope.editCompany = function(company){
      $location.path('/company/edit/' + company.id);
    };

    $scope.deleteCompany = function(company){
      CompanyService.delete(company.id);
    };

    var init = function(){
      $scope.companies = CompanyService.getAll();
    };

    init();
  }]);
