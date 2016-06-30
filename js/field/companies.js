angular.module('field')
  .controller('CompanyListController', ['$scope','$location', 'CompanyService',
  function($scope,$location, CompanyService){

    $scope.editCompany = function(company){
      $location.path('/company/edit/' + company.id);
    };

    $scope.deleteCompany = function(company){
      CompanyService.delete(company.id);
    };

    $scope.addCompany = function(){
      $location.path("/company/new");
    };

    var init = function(){
      $scope.companies = CompanyService.getAll();
    };

    init();
  }]);

angular.module('field')
  .controller('CompanyEditController', ['$scope','$location', 'selectedCompany',
  'CompanyService','FieldService','Field',
  function($scope,$location, selectedCompany, CompanyService,FieldService, Field){

    $scope.updateCompany = function(){
      CompanyService.update($scope.company);
      $location.path('/companies');
    };

    $scope.addField = function(){
      $scope.company.fields.push(new Field({
        id: $scope.company.fields.length + 1
      }));
    };

    $scope.deleteField = function(field){
      var fieldIndex;
      angular.forEach($scope.company.fields, function(e, index){
        if(e.id === field.id){
          fieldIndex = index;
        }
      });
      if(fieldIndex >= 0) $scope.company.fields.splice(fieldIndex, 1);
    };

    var init = function(){
      $scope.company = selectedCompany;
    };

    init();
  }]);

angular.module('field')
  .controller('CompanyCreateController', ['$scope', '$location', 'CompanyService',
  'Field','Company',
  function($scope, $location, CompanyService, Field, Company){

    $scope.addField = function(){
      $scope.company.fields.push(new Field({
        id: $scope.company.fields.length + 1
      }));
    };

    $scope.createCompany = function(){
      CompanyService.create($scope.company);
      $location.path('/companies');
    };

    var init = function(){
      $scope.company = new Company({
        fields: []
      });
    };
    init();
  }]);
