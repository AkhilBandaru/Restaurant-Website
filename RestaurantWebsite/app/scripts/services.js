'use strict';

angular.module('confusionApp')

        .constant("baseURL","http://localhost:3000/")

        .service('menuFactory', ['$http','$resource', 'baseURL', function($http,$resource,baseURL) {
    
                this.getDishes = function(){
                                        return $http.get(baseURL+"dishes");
                                    };
                this.getDish = function (index) {
                                        return $http.get(baseURL+"dishes/"+index);
                };
                
                this.updateDishComment = function(dishes,id){
//                    return $resource(baseURL+"dishes/:id",null,{
//                      'update':{
//                        method:'PUT'
//                      }
//                    });
                    return $http.put(baseURL+"dishes/"+id,angular.toJson(dishes));
                };
                
                this.getPromotion = function(index){
                    return $http.get(baseURL+"promotions/"+index);
                };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
    
                        
        }])

        .service('corporateFactory',  ['$http', 'baseURL', function($http,baseURL) {
    
            
                    this.getLeaders = function(){
                        return $http.get(baseURL+"leadership");
                    };
            
                    this.getLeader = function(index){
                        return $http.get(baseURL+"leadership/"+index);
                    };
                    
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
    
    
        }])

;