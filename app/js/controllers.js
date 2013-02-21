'use strict';

/* Controllers */


function MyCtrl1($scope) {
	$scope.templates = [{url:'./partials/footer.html'}, {url:'./partials/standard_top.html'}];
	$scope.template = $scope.templates[0];
}
//MyCtrl1.$inject = [$scope];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
