app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.message = "";
    $scope.unitView = "F";

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather);
        } else {
            $scope.message = "Geolocation is not supported by this browser.";
        }
    }
    function getWeather(position) {
        var lat = position.coords.latitude
        var long = position.coords.longitude;
        var units = "&units=imperial";
        var apiKey = "&APPID=fb7e4b6c408eccf143f97022282a8141";
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="
            + long + units + apiKey + "&callback=JSON_CALLBACK";
        console.log("url: " + url);
        $http.jsonp(url)
            .then(function(response) {
                $scope.weather = response.data.weather[0].main;
                $scope.city = response.data.name;
                $scope.iconAdd = "http://openweathermap.org/img/w/"+response.data.weather[0].icon+".png";
                $scope.temp = response.data.main.temp;
            }, function(response) {
                $scope.message = "Something went wrong";
            });

    }

    $scope.changeUnits = function(){
        if($scope.unitView === 'F'){
            $scope.temp = ($scope.temp - 32) / 1.8;
            $scope.unitView = 'C';
        }else{
            $scope.temp = $scope.temp * 1.8 + 32;
            $scope.unitView = 'F';
        }

    }

    getLocation();
}]);