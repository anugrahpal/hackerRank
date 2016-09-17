(function(){

	'use strict'

	angular.module('onePush', ['ngMaterial', 'ngAria', 'ngMdIcons'])

	.run(function($rootScope, $http){
		$rootScope.search = function(){

			$rootScope.loading = true;
			$rootScope.listdata ='';
			$rootScope.thumbsCount = '';
			$http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites')
			 .success(function(data) {
			 	$rootScope.listdata = data.websites;
			 	console.log($rootScope.listdata);
			 	$rootScope.loading = false;
			 	$rootScope.totalProfiles = $rootScope.listdata.length;
			 })
			 .error( function (data) {
		        console.log('Search error: ' + data);
		     })
		}();
	})

	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('pink');
	})

	.controller('mainController', function($scope, $http, $mdDialog, $mdMedia, $mdToast) {

		$scope.newTitle = '';
		$scope.newWeb = '';
		$scope.newTag = ''

		$scope.openToast = function($event) {
		  $mdToast.show($mdToast.simple().textContent('Web portfolio added successfully :)'));
		};

		$scope.openfToast = function($event) {
		  $mdToast.show($mdToast.simple().textContent('Error adding portfolio :( Please try again'));
		};

		$scope.new = function() {
			$scope.hitUrl = 'https://hackerearth.0x10.info/api/one-push?type=json&query=push&title=' + $scope.newTitle + '&url='+ $scope.newWeb + '&tag=' + $scope.newTag;

			$http.post($scope.hitUrl)
				.success(function(status, message) {
					$scope.status = status;
					$scope.message = message;
					console.log($scope.status);
					console.log($scope.message);
					$scope.openToast();
				})
				.error(function(data){
					console.log('Error posting portfolio: ' + data);
					$scope.openfToast();
				})
		}
			
	})

})()