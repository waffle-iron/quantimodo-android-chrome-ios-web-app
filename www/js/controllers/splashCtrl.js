angular.module('starter')
.controller('SplashCtrl', function($scope, $state, splashService) {


    $scope.$on('$ionicView.beforeEnter', function(e) { console.debug("Entering state " + $state.current.name);
        splashService.purpleParticleAnimation();
    });

    $scope.$on('$ionicView.afterEnter', function(){

    });

});
