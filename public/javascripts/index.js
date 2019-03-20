var app = angular.module('giba',  []);

app.value('apiAddress', 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon');

app.factory('apiFactory', function($http, apiAddress) {
    return $http({
        method: 'GET',
        url: apiAddress
    });
})

app.directive('dragonsList', function() {

})

app.controller('indexController', function($scope, apiFactory) {
    apiFactory.then(function(result) {
        $scope.dragons = result.data;
        $scope.dragonTypes = result.data.map(function(dragon) {
            return dragon.type; //distinct
        });
    })
    .catch(function(error) {
        console.error(error);
    });

    $scope.edit = function(dragon) {
        dragon.editing = true;
    }

    $scope.save = function(dragon) {
        dragon.editing = false;
    }

    $scope.saveNewDragon = function(dragon) {
        var lastId = $scope.dragons[($scope.dragons.length - 1)].id;
        var createdAt = new Date().toISOString();

        dragon.id = parseInt(lastId) + 1;
        dragon.createdAt = createdAt;

        $scope.dragons.push(dragon);

        dragon = null;
    }

    $scope.remove = function(dragon) {
        var index = $scope.dragons.findIndex(function(d) {
            return d.id === dragon.id;
        })

        $scope.dragons.splice(index, 1);
    }
});