angular.module('SPApp', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'templates/home.html'
        })
        .when('/about', {
            templateUrl: 'templates/about.html'
        })
        .when('/contact', {
            templateUrl: 'templates/contact.html'
        })
        .when('/movies', {
            templateUrl: 'templates/movies.html',
            controller: 'MoviesCtrl'
        })
        .when('/movie/:id', {
            templateUrl: 'templates/movie.html',
            controller: 'MovieCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        })
})

.run(function($rootScope, $location) {

    $rootScope.isActive = function(location) {
        return $location.path().indexOf(location) === 0;
    }
})

.controller('MoviesCtrl', function($scope, MoviesFactory) {
    MoviesFactory
        .get()
        .then(function(response) {
            console.log(response);
            $scope.movies = response.data;
        })
        .catch(function(error) {
            console.log(error);
        })
})

.controller('MovieCtrl', function($routeParams, MoviesFactory, $scope) {
    console.log($routeParams)
    MoviesFactory
        .get()
        .then(function(response) {
            console.log(response);
            $scope.currMovie = response.data[$routeParams.id];
        })
        .catch(function(error) {
            console.log(error);
        })
})

.factory('MoviesFactory', function($http) {
    var API = {
        get: function() {
            return $http.get('movies.json');
        }
    };
    return API;
})
