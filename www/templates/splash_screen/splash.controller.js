angular.module('wechat.controllers')
.controller('splashCtrl', ['$scope','$location','$window', '$ionicHistory','$interval',
	function($scope,$location,$window,$ionicHistory,$interval){

	$scope.vm={};//数据模型对象
	$scope.vm.count=3;
	var timer=$interval(function () {
		  $scope.vm.count--;
		  if($scope.vm.count==0){
		  	$interval.cancel(timer);
		  	startApp();
		  }
	},1000);

	$window.localStorage['code']='25c85dd791fd81f528eb550d6c107dcf';
	
	//事件:
	$scope.goEarlier=function () {
		  $interval.cancel(timer);
		  startApp();
	}

	function startApp () {
		var user = $window.localStorage['code'] || '';
		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});
		// if ($.isEmptyObject(user)) {
		// 	$location.path("login");
		// }else{
			$location.path('/tab/message');
		// }
	}

}])
