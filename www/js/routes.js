angular.module('wechat.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        //倒计时启动页..............................
        .state('splash', {
            url: '/splash',
            cache: false,
            templateUrl: 'templates/splash_screen/splash.html',
            controller: 'splashCtrl'
        }) 
        //首页选项卡...................................
        .state("tab", {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
        })
        .state('tab.message', {
            url: '/message',
            views: {
                'tab-message': {
                    templateUrl: 'templates/tab-message.html',
                    controller: "messageCtrl"
                }
            }
        })
        .state('messageDetail', {
            url: '/messageDetail/:messageId',
            templateUrl: "templates/message-detail.html",
            controller: "messageDetailCtrl"
        })
        .state('tab.friends', {
            url: '/friends',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/tab-friends.html',
                    controller: "friendsCtrl"
                }
            }
        })
        .state('tab.find', {
            url: '/find',
            views: {
                'tab-find': {
                    templateUrl: 'templates/tab-find.html',
                    controller: "findCtrl"
                }
            },
        })
        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/tab-setting.html',
                    controller: "settingCtrl"
                }
            }
        })
        //首页选项卡结束.........................

        .state('personSet',{
            cache:false,
            url:'/personSet',
            templateUrl:'templates/setting/personSet.html',
            controller: 'personSetCtrl'
        })
        .state('area',{
            cache:false,
            url:'/area',
            templateUrl:'templates/setting/area.html',
            controller: 'areaCtrl'
        })

        //发现选项卡下-----------------------------
        .state('active',{
            // cache:false,
            url:'/active',
            templateUrl:'templates/find/active.html',
            controller:'activeCtrl'
        })

        .state('subTab',{
            url:'/subTab',
            // abstract:true,
            templateUrl:'templates/find/subTab.html',
            // controller:'subTabCtrl'
        })
        .state('subTab.req',{
            url:'/req',
            views:{
                'req':{
                    templateUrl:'templates/find/req.html',
                    controller:'reqCtrl'
                }
            }
        })
        .state('subTab.res',{
            url:'/res',
            views:{
                'res':{
                    templateUrl:'templates/find/res.html',
                    controller:'resCtrl'
                }
            }
        })
    $urlRouterProvider.otherwise("/splash");
});