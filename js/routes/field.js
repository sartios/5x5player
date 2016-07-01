angular.module('field',['ngRoute'])
  .config(function($routeProvider){
    $routeProvider.when("/fields",{
      templateUrl: 'partials/field/fields.html',
      controller: 'FieldListController'
    });

    $routeProvider.when("/field/new",{
      templateUrl: 'partials/field/create-field.html',
      controller: 'FieldCreateController'
    });

    $routeProvider.when("/field/edit/:id",{
      templateUrl: 'partials/field/update-field.html',
      controller: 'FieldEditController',
      resolve:{
        selectedField:['FieldService', '$route', '$location',
          function(FieldService, $route, $location){
            var field = FieldService.getById($route.current.params.id);
            if(!field){
              $location.path("/fields");
            }
            return field;
          }]
      }
    });

    $routeProvider.when("/companies", {
      templateUrl: 'partials/field/companies.html',
      controller: 'CompanyListController'
    });

    $routeProvider.when("/company/new", {
      templateUrl: 'partials/field/create-company.html',
      controller: 'CompanyCreateController'
    });

    $routeProvider.when("/company/edit/:id", {
      templateUrl: 'partials/field/update-company.html',
      controller: 'CompanyEditController',
      resolve:{
        selectedCompany:['CompanyService', '$route', '$location',
        function(CompanyService, $route, $location){
          var company = CompanyService.getById($route.current.params.id);
          if(!company){
            $location.path("/companies");
          }
          return company;
        }]
      }
    });

    $routeProvider.when("/company/:id/fields", {
      templateUrl: 'partials/field/company-fields.html',
      controller: 'CompanyFieldsListController',
      resolve:{
        selectedCompany:['CompanyService', '$route', '$location',
        function(CompanyService, $route, $location){
          var company = CompanyService.getById($route.current.params.id);
          if(!company){
            $location.path("/companies");
          }
          return company;
        }]
      }
    });
  });
