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

angular.module('field')
  .controller('CompanyEditController', ['$scope','$location', 'selectedCompany', 'CompanyService',
  function($scope,$location, selectedCompany, CompanyService){

    $scope.updateCompany = function(){
      CompanyService.update($scope.company);
      $location.path('/companies');
    };

    var init = function(){
      $scope.company = selectedCompany;
    };

    init();
  }]);
