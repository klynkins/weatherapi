/* global $ APIKEY */

var API_KEY = APIKEY; 
var loc;
var fahr = false;
var data;

var weatherImage = "";
  var imagePhoto = {
	thunder: "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?auto=format&fit=crop&w=1051&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
	rainyNight: "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?auto=format&fit=crop&w=1189&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    rainy: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=967&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
	cloudy: "https://images.unsplash.com/photo-1496162963310-1180604b1e53?auto=format&fit=crop&w=1060&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    cloudyNight: "https://images.unsplash.com/photo-1488251550865-19b3b4ae5734?auto=format&fit=crop&w=967&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
	snow: "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
	clear: "https://images.unsplash.com/photo-1508814981118-3f81fbe6e4f0?auto=format&fit=crop&w=1189&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  clearNight: "https://images.unsplash.com/photo-1495567357861-a3597539c9c6?auto=format&fit=crop&w=634&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
	cold: "https://images.unsplash.com/photo-1489718136246-94eb2f8082cd?auto=format&fit=crop&w=967&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
	windy: "https://images.unsplash.com/photo-1474393881983-cd780bf9f4ad?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  windyNight: "http://www.fact.co.uk/media/6330259/NightJourney_windyTrees.jpg",
	hail: "https://images.unsplash.com/photo-1509460508600-14866bc21c30?auto=format&fit=crop&w=676&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  sunny: "https://images.unsplash.com/photo-1501693763903-1ff86bcf3af9?auto=format&fit=crop&w=1052&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
};


function selectImage (id) {
    if (id >= 200 && id <= 232){
		weatherImage = imagePhoto.thunder;
	}else if (id >= 500 && id <= 531){
		weatherImage = imagePhoto.rainy;
	}else if (id >= 600 && id <= 622){
		weatherImage = imagePhoto.snow;
	}else if (id >= 701 && id <= 721 ){
		weatherImage = imagePhoto.clear;
	}else if (id >= 801 && id <= 804){
		weatherImage = imagePhoto.cloudy;
	}else if (id === 903){
		weatherImage = imagePhoto.cold;
	}else if (id === 904){
		weatherImage = imagePhoto.sunny;
	}else if (id === 905){
		weatherImage = imagePhoto.windy;
	}else if (id === 906){
		weatherImage = imagePhoto.hail;
	}else{
		weatherImage = imagePhoto.windy;
  }
  $('body').css('background-image', 'url(' + weatherImage + ')'); 
} 

$(document).ready(function() {

    function displayTemp(cTemp, f) {
        if (f) return Math.round((cTemp * (9 / 5)) + 32) + "F";
        return Math.round(cTemp) + "C";
    }

    function render(data, fahr) {
        var currentLocation = data.name;
        var id = data.weather[0].id;
        var currentWeather1 = data.weather[0].main;
        var currentWeather2 = data.weather[0].description;
        var currentTemp = displayTemp(data.main.temp, fahr);
        var high = displayTemp(data.main.temp_max, fahr);
        var low = displayTemp(data.main.temp_min, fahr);
        var icon = data.weather[0].icon;

        document.getElementById("currentLocation").innerHTML = currentLocation;
        document.getElementById("currentTemp").innerHTML = currentLocation;
        document.getElementById("currentWeather1").innerHTML = currentWeather1;
        document.getElementById("currentWeather2").innerHTML = currentWeather2;
        document.getElementById("high-low").innerHTML = high + " / " + low;

        var iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
        $("#currentTemp").prepend('<img src="' + iconSrc + '">')
    }


    $.getJSON("https://ipinfo.io/", function(d) {
        loc = d.loc.split(",");
        console.log(loc); 

        $.getJSON("https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY, function(apiData) {
            data = apiData;
            var id = data['weather'][0]['id'];

            render(apiData, fahr);

            $("#toggle").click(function() {
                fahr = !fahr;
                render(data, fahr);
            })
        selectImage(id);
        })
        
    })
})
