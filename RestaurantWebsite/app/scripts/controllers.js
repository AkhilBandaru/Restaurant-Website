'use strict';

angular.module('confusionApp')

        .controller('menuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
                       $scope.dishes= {};
            menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                }
            );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('assignController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message="Loading ...";
                        $scope.dishes = {};
             menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dishes = response.data;
                    $scope.showDish=true;
                }
            );
        }])

        .controller('DishCommentController', ['$scope','$stateParams', 'menuFactory', function($scope,$stateParams,menuFactory) {
            
            $scope.mycomment = {rating:5};
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                $scope.mycomment.rating = parseInt($scope.mycomment.rating);
                
                $scope.dishes.comments.push($scope.mycomment);
                
                menuFactory.updateDishComment($scope.dishes,parseInt($stateParams.id,10))
                .then
                (
                    function(response){
                        $scope.message = response.data;
                    }
                );
//                menuFactory.updateDishComment().save($scope.dishes);
                
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5,comment:"", author:"", date:""};
                
            };
        }])


        .controller('IndexController', ['$scope','menuFactory','corporateFactory', function($scope,menuFactory,corporateFactory) {

                        
                        $scope.showDish = false;
                        $scope.showPromotion = false;
                        $scope.message="Loading ...";
                        $scope.dishes = {};
                        $scope.promotion= {};
                        $scope.leader = {};

                        menuFactory.getDish(0)
                        .then(
                            function(response){
                                $scope.dishes = response.data;
                                $scope.showDish = true;
                            }
                        );
            
                       menuFactory.getPromotion(0)
                        .then(
                            function(response){
                                $scope.promotion = response.data;
                                $scope.showPromotion = true;
                            }
                        );
                        
                       corporateFactory.getLeader(0)
                        .then(
                            function(response){
                                $scope.leader = response.data;
                            }
                        );
            
        }])

        .controller('AboutController', ['$scope','corporateFactory', function($scope,corporateFactory) {
            
            $scope.showLeader = false;
            $scope.message = "Loading";
            $scope.leaders = {};
            corporateFactory.getLeaders()
            .then(
                function(response){
                    $scope.leaders = response.data;
                    $scope.showLeader = true;
                }
            );
            
            
        }])

        .controller('AboutEachController', ['$scope','$stateParams','corporateFactory', function($scope,$stateParams,corporateFactory) {
            
            $scope.showLeader = false;
            $scope.message = "Loading";
            $scope.leaders = {};
            corporateFactory.getLeader(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.leaders = response.data;
                    $scope.showEachLeader = true;
                }
            );
        }])

        // implement the IndexController and About Controller here


;