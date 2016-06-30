angular.module('field')
  .factory('CompanyService', ['Company','Field', function(Company,Field){
    var service = {};
    var companies = [];

    service.create = function(company){
      if(company.name){
        company.id = companies.length + 1;
        companies.push(company);
      }
      return company;
    };

    service.update = function(company){
      angular.forEach(companies, function(e, index){
        if(e.id === company.id){
          companies[index] = company;
        }
      });
      return company;
    };

    service.delete = function(companyId){
      var companyIndex;
      angular.forEach(companies, function(company, index){
        if(company.id == companyId){
          companyIndex = index;
        }
      });

      if(companyIndex >= 0) companies.splice(companyIndex, 1);
    };

    service.deleteField = function(company, field){
      var companyIndex;
      angular.forEach(companies, function(e, index){
        if(e.id == company.id){
          companyIndex = index;
        }
      });
      if(companyIndex >= 0){
        var fieldIndex;
        angular.forEach(companies[companyIndex].fields, function(e, index){
          if(e.id == field.id){
            fieldIndex = index;
          }
        });
        if(fieldIndex >= 0) companies[companyIndex].fields.splice(fieldIndex, 1);
      }
    };

    service.getAll = function(){
      return companies;
    };

    service.getById = function(companyId){
      var company;
      angular.forEach(companies, function(e, index){
        if(e.id == companyId){
          company = angular.copy(companies[index]);
        }
      });
      return company;
    };

    var setupCompanies = function(){
      companies.push(new Company({
        id: 1,
        location: 'City 1',
        name: 'Company 1',
        fields: [new Field({
          id: 1,
          name: 'Field 1',
          size: 10
        })]
      }));

      companies.push(new Company({
        id: 2,
        location: 'City 2',
        name: 'Company 2',
        fields: [new Field({
          id: 1,
          name: 'Field 1',
          size: 10
        })]
      }));
    };

    var init = function(){
      setupCompanies();
    };
    init();

    return service;
  }]);

angular.module('field')
  .factory('FieldService', ['Field','Company', function(Field, Company){
    var service = {};
    var fields = [];


    service.create = function(field){
      if(field.name){
        field.id = fields.length + 1;
        fields.push(field);
      }
      return field;
    };

    service.update = function(field){
      angular.forEach(fields, function(e, index){
        if(e.id === field.id){
          fields[index] = field;
        }
      });
      return field;
    };

    service.delete = function(fieldId){
      var fieldIndex;
      angular.forEach(fields, function(field, index){
        if(field.id == fieldId){
          fieldIndex = index;
        }
      });
      if(fieldIndex >= 0) fields.splice(fieldIndex, 1);
    };

    service.getAll = function(){
      return fields;
    };

    service.getById = function(fieldId){
      var field;
      angular.forEach(fields, function(e, index){
        if(e.id == fieldId){
          field = angular.copy(fields[index]);
        }
      });
      return field;
    };

    service.getFieldsByCompanyId = function(companyId){
      return fields.filter(function(field){
        return field.company.id == companyId;
      });
    };

    service.generateId = function(){
      return fields.length + 1;
    };

    var setupFields = function(){
      fields.push(new Field({
        id: 1,
        name: 'Field 1',
        size: 10,
        company: new Company({
          id: 1,
          location: 'City 2',
          name: 'Company 1',
        })
      }));

      fields.push(new Field({
        id: 2,
        name: 'Field 2',
        size: 10,
        company: new Company({
          id: 1,
          location: 'City 2',
          name: 'Company 1',
        })
      }));

      fields.push(new Field({
        id: 3,
        name: 'Field 3',
        size: 10,
        company: new Company({
          id: 2,
          location: 'City 2',
          name: 'Company 2',
        })
      }));

      fields.push(new Field({
        id: 4,
        name: 'Field 4',
        size: 10,
        company: new Company({
          id: 2,
          location: 'City 2',
          name: 'Company 2',
        })
      }));
    };

    var init = function(){
      setupFields();
    };

    init();

    return service;
  }]);
