// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('wechat', ['ionic','ngCordova','wechat.controllers', 'wechat.routes',
    'wechat.services', 'wechat.directives', 'monospaced.elastic'
])

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])

.run(function($ionicPlatform, $http, messageService, dateService,$rootScope,
    $window,baiduLocation,$ionicHistory,$cordovaToast,$location) {

    var url = "";
    if (ionic.Platform.isAndroid()) {
        url = "/android_asset/www/";
    }

    // if (localStorage.getItem("messageID") === null) {

        $http.get(url + "data/json/messages.json").then(function(response) {
            // localStorageService.update("messages", response.data.messages);
            messageService.init(response.data.messages);

        });
        $http.get(url + "data/json/friends.json").then(function(response){
            console.log(response.data.results);
        });
    // }

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        //定位
        navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
        function success(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log('定位到{latitude:'+lat+',longitude:'+lon+'}');
            baiduLocation.getCityName(lat,lon).then(function (result) {
                  $window.localStorage['locCity']=result.addressComponent.city;
            }, function (err) {
                  console.error(err);
            })
        };

        function error() {
            console.log("不能定位当前位置");
        };
    });

    /*双击退出*/
    var first_time=new Date().getTime();
    $ionicPlatform.registerBackButtonAction(function (e) {
        // if ($location.path().indexOf('tab')!=-1) {
        //     var second_time=new Date().getTime();
        //     if(second_time-first_time>1000){
        //         $cordovaToast.showShortBottom('再按一次退出系统!');
        //         first_time=new Date().getTime();
        //         return;
        //     }else{
        //         ionic.Platform.exitApp();
        //     }
        // }else 
        if ($ionicHistory.backView()) {
            console.log("使用$ionicHistory.goBack()返回历史");
            $ionicHistory.goBack();
        }else {
            // console.log("$window.history.back()");
            // $window.history.back();
        } 
        e.preventDefault();
        return false;
    }, 101);//101是优先级,$ionicLoading优先级是500

    /*全局回退方法*/
    $rootScope.goBack=function (mark) {
         // $window.history.back();
         // debugger
         $ionicHistory.goBack();
    }

});
