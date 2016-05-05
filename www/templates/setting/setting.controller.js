angular.module('wechat.controllers')
.controller('settingCtrl', function($scope, $state) {
    $scope.onSwipeRight = function() {
        $state.go("tab.find");
    };
    $scope.user={};
    $scope.user.tel=123;
    $scope.abc={};
    // $scope.x='';
    $scope.check=function () {
        // $scope.$apply();
         // console.log("$scope变量:"+$scope.user.tel); 
         console.log('jq获取的变量:'+$('#tt').val());
         console.log('$scope变量:'+$scope.abc.x);
    }

    $scope.vm={};
    // $scope.color='';
    $scope.gotoSetting=function () {
    	 $state.go('personSet'); 
    }

})
.controller('personSetCtrl', function($scope, $state) {
	
    //事件:
    $scope.goArea=function () {
         $state.go('area'); 
    }
})
.controller('areaCtrl', function($scope,AreaListFactory,LetterFactory,$window){

    AreaListFactory.getAreaList().then(function (callback) {
        if(callback.status==200){
            $scope.areas=callback.data.result;
            $scope.areaLetters=[];
            for (var i = 0; i < $scope.areas.length; i++) {
                $scope.areaLetters.push(LetterFactory.getLetter($scope.areas[i].region_name).toString());
            }
        } 
    })

    $window.onscroll=function () {
         console.log(1); 
    }


    $scope.letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    //list排序过滤,此放在controller中,因为放在filter.js里不起作用,原因不知
    $scope.areaOrder=function (input) {
          return LetterFactory.getLetter(input.region_name);
    }

    
})