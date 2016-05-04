angular.module('starter')

    // Controls the Track Page of the App
    .controller('TrackPrimaryOutcomeCtrl', function($scope, $ionicModal, $state, $timeout, utilsService, authService, 
                                                    measurementService, chartService, $ionicPopup, localStorageService) {
        $scope.controller_name = "TrackPrimaryOutcomeCtrl";

        $scope.showCharts = false;
        $scope.showRatingFaces = true;

        $scope.recordPrimaryOutcomeVariableRating = function (primaryOutcomeRatingValue) {

            // flag for blink effect
            $scope.timeRemaining = true;
            $scope.showRatingFaces = false;

            if (window.chrome && window.chrome.browserAction) {
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }

            // update localstorage
            measurementService.updatePrimaryOutcomeVariableLocally(primaryOutcomeRatingValue).then(function () {

                // try to send the data to server
                measurementService.updatePrimaryOutcomeVariable(primaryOutcomeRatingValue);

                // calculate charts data
                measurementService.calculateAveragePrimaryOutcomeVariableValue().then(function () {

                    setTimeout(function () {
                        $scope.timeRemaining = false;
                        $scope.$apply();
                    }, 500);

                    draw();
                });
            });
        };

        // Update primary outcome variable images via an integer
        var updateAveragePrimaryOutcomeRatingView = function(averagePrimaryOutcomeVariableRating){
            var averageRatingValue = config.appSettings.primaryOutcomeValueConversionDataSet[averagePrimaryOutcomeVariableRating];
            if(averageRatingValue){
                $scope.averagePrimaryOutcomeVariableImage = config.getImageForPrimaryOutcomeVariableByValue(averageRatingValue);
                $scope.averagePrimaryOutcomeVariableValue = averageRatingValue;
                console.log("updated averagePrimaryOutcomeVariableRating view");
            }

            if(!$scope.$$phase) {
                console.log("Not in the middle of digest cycle, so redrawing everything...");
                $scope.$apply();
            }
        };


        var updateBarChart = function(arr){
            $scope.redrawBarChart = false;
            console.log("re-drawing bar chart");

            console.log("load config object chartService.getBarChartStub");
            $scope.barChartConfig = chartService.getBarChartStub(arr);

            console.log("redraw chart with new data");
            $scope.redrawBarChart = true;

        };

        var updateLineChart = function(lineChartData){

            $scope.redrawLineChart = false;
            console.log("Configuring line chart...");
            $scope.lineChartConfig = chartService.getLineChartStub(lineChartData);

            // redraw chart with new data
            $scope.redrawLineChart = true;

        };

        // updates all the visual elements on the page
        var draw = function(){
            localStorageService.getItem('averagePrimaryOutcomeVariableValue',function(averagePrimaryOutcomeVariableValue){
                if(averagePrimaryOutcomeVariableValue){
                    updateAveragePrimaryOutcomeRatingView(averagePrimaryOutcomeVariableValue);
                }

                // update line chart
                localStorageService.getItem('lineChartData',function(lineChartData){
                    if(lineChartData !== "[]") {
                        updateLineChart(JSON.parse(lineChartData));
                        $scope.showCharts = true;
                    }

                    // update bar chart
                    localStorageService.getItem('barChartData',function(barChartData){
                        if(barChartData !== "[0,0,0,0,0]"){
                            updateBarChart(JSON.parse(barChartData));
                            if(!$scope.$$phase) {
                                $scope.$apply();
                            }
                            $scope.showCharts = true;
                        }
                    });
                });
            });
        };

        // constructor
        $scope.init = function(){

            // flags
            $scope.timeRemaining = false;
            $scope.averagePrimaryOutcomeVariableImage = false;
            $scope.averagePrimaryOutcomeVariableValue = false;

            // chart flags
            $scope.lineChartConfig = false; 
            $scope.barChartConfig = false;
            $scope.redrawLineChart = true;
            $scope.redrawBarChart = true;

        };

        $scope.init();

        // to handle redrawing event's triggered through sibling controllers.
        $scope.$on('redraw', function(){
            console.log("redrawing");
            
            // update everything
            draw();
        });

        // when this view is brought in focus
        $scope.$on('$ionicView.enter', function(e) {
            
            // update everything
            draw();
        });
    });