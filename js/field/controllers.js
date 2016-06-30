angular.module('field')
  .controller('FieldListController', ['$scope','$location', 'FieldService',
  function($scope, $location, FieldService){

    $scope.editField = function(field){
      $location.path('/field/edit/' + field.id);
    };

    $scope.deleteField = function(field){
      FieldService.delete(field.id);
    };

    var init = function(){
      $scope.fields = FieldService.getAll();
    };

    init();
}]);

angular.module('field')
  .controller('FieldCreateController', ['$scope','$location','Field', 'FieldService', 'CompanyService',
  function($scope,$location,Field, FieldService, CompanyService){

    $scope.createField = function(){
      FieldService.create($scope.field);
      $location.path('/fields');
    };

    var init = function(){
      $scope.companies = CompanyService.getAll();
    };

    init();

}]);


angular.module('field')
  .controller('FieldEditController', ['$scope','$location','selectedField','FieldService','CompanyService',
  function($scope, $location, selectedField, FieldService, CompanyService){

    $scope.updateField = function(){
        FieldService.update($scope.field);
        $location.path('/fields');
    };

    var init = function(){
      $scope.field = selectedField;
      $scope.companies = CompanyService.getAll();
    };

    init();
  }]);
