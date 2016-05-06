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
.controller('areaCtrl', function($scope,AreaListFactory,LetterFactory,$window,
    $filter,$ionicScrollDelegate){

    AreaListFactory.getAreaList().then(function (callback) {
        if(callback.status==200){
            $scope.areas=$filter('orderBy')(callback.data.result,$scope.areaOrder);
            $scope.areaLetters=[];
            for (var i = 0; i < $scope.areas.length; i++) {
                $scope.areaLetters.push(LetterFactory.getLetter($scope.areas[i].region_name).toString());
            }
            $scope.index=$scope.letters.indexOf(LetterFactory.getLetter($scope.areas[0].region_name)[0]);
            itemHeight=$("#area ul li").outerHeight();
            
        } 
    })


//     angular.element($('#area')).on('scroll',function(){
//         $("#area ul").scroll();
//         console.log(1)
//     })
    var itemHeight;
    $scope.scroll=function(){
        itemHeight=itemHeight||$("#area ul li").outerHeight();
        var top=$ionicScrollDelegate.$getByHandle('area').getScrollPosition().top;
        var index=Math.floor(top/itemHeight);
         $scope.index=$scope.letters.indexOf(LetterFactory.getLetter($scope.areas[index].region_name)[0]);
         $scope.$apply();
        // console.log('滚动的距离='+top);
    }    

    //点击字母索引事件
    $scope.selectItem=function (event) {
        //获取offsetHeight的操作放在事件中,其他地方取不到的奇怪bug
        itemHeight=itemHeight||$("#area ul li").outerHeight();
        var target=event.target.innerText;
        var selIdx= $scope.areaLetters.indexOf(target);
        $ionicScrollDelegate.$getByHandle('area').scrollTo(0,selIdx*itemHeight);
    }

    $scope.letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    //list排序过滤,此放在controller中,因为放在filter.js里不起作用,原因不知
    $scope.areaOrder=function (input) {
          return LetterFactory.getLetter(input.region_name);
    }
    
    
})