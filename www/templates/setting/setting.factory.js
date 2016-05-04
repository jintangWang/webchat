angular.module('wechat.services')
.factory('AreaListFactory',function (serverIP,$http,$window) {
	return{
		getAreaList:function () {
			return $http({
				method:'GET',
				url:'data/json/area.json'
			}).success(function (response) {
				 return response; 
			})
		}
	}
})
