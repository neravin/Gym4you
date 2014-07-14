//window.onload = getMyLocation;

var my_lat;				// my latitude coordinate (geolocation)
var my_lng;				// my longitude coordinate (geolocation)
var is_find = false; 	// flag introduced if the radius of the field and address 
var geocoder;
var my_address = "вяземский 5/7";
var radius; 
var affilates;
var num_gyms;			// number of different gyms

var directionsDisplay;
//var directionsService = new google.maps.DirectionsService();


function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
	// Если нажали на кнопку "поиск места"
	geocoder = new google.maps.Geocoder();
	//var button = document.getElementById("findButton");
	//button.onclick = handleFindClick;
	my_address = document.getElementById("my_address").value;
	radius = document.getElementById('radius').value;
  var first_price = document.getElementById('first_price').value;
  var last_price = document.getElementById('last_price').value;

	if(my_address && (radius > 0) && (first_price < last_price)){
		is_find = true;
		affilates = JSON.parse(this.affilates_json);

		// find number of diferent gyms
		num_gyms = 1;
		if(affilates.length > 0){
			var buf_affiliate = affilates[0].gymnasium_id;
			for (var i = 0; i < affilates.length; i++) {
				if(affilates[i].gymnasium_id != buf_affiliate){
					num_gyms++;
				}
				buf_affiliate = affilates[i].gymnasium_id;
			};
	  }
	  
	}
	getMyLocation();
}

/*function handleFindClick(){
	is_find = false;
	getMyLocation();
}*/

//____________________________________________________________________________
//
//   Geolocation and Google Map
//____________________________________________________________________________
// Проверка браузера на поддержку службы геолокации
function getMyLocation(){
	if(navigator.geolocation){
		//navigator.geolocation.getCurrentPosition(displayLocation, displayError);
		if(!is_find){
			// output location
			navigator.geolocation.getCurrentPosition(success,displayError);
		}
		else{
			// Собираем данные их формы
			codeAddress(my_address, function(coord){
				var myLatlng = new google.maps.LatLng(coord.lat(), coord.lng());
				displayLocation(myLatlng);
			});
			
		}
	}
	else{
		alert("Браузер не поддерживает геолокацию");
	}
}

function success(position) {
     var my_lat = position.coords.latitude;
     var my_lng = position.coords.longitude;
     var myLatlng = new google.maps.LatLng(my_lat, my_lng);
		displayLocation(myLatlng);
}

// Функция для отображения координат
function displayLocation(position){
	//var latitude = position.coords.latitude;
	//var longitude = position.coords.longitude;
	var latitude = position.lat();
	var longitude = position.lng();
	//var address = codeLatLng(position);
	
	var address;
	codeLatLng(position, function(address){
		document.getElementById('my_address').value = address;
		//codeAddress(address);
		codeAddress(address, function(coord){
			showGoogleMap(coord);
		});	
	});
}



// Обработчик ошибок, связанных с геолокацией
function displayError(error){
	var errorTypes = {
		0: "Неизвестная ошибка",
		1: "Доступ запрещен пользователем",
		2: "Положение не доступно",
		3: "Истекло время ожидания"
	};
	var errorMessage = errorTypes[error.code];
	if(error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}



//____________________________________________________________________________
//
//   Google map
//____________________________________________________________________________
var map ;	// Глобальная переменная, содержащая карту Google

// Отображение карты в браузере
function showGoogleMap(coords){
	// упаковка координат в google объект с помощью конструктора LatLng
	//var mapPosition = new google.maps.LatLng(coords.latitude, coords.longitude);
	
	var mapPosition = new google.maps.LatLng(coords.lat(), coords.lng());
	
	// Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Green Map"});

  // создание объекта mapOption с параметрами для карты
	var mapOption = {
		center: mapPosition,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 14,
		mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
	};
	var divMap = document.getElementById("map");

	map = new google.maps.Map(divMap, mapOption);
	//Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

	// marker
	var title = "Ваше расположение";
	var colour = "cccccc";
	var content = 'Вы находитесь здесь';
	var is_man = true;
	addMarker(map, mapPosition, title, content, colour, is_man);
	// output gyms markers on map
	if(affilates){

		var rgbArray = rgbArrayColor(affilates.length);
		countColour = 0;
		colour = rgbToHex(rgbArray[countColour]);
		uniqGym = affilates[0].gymnasium_id;
		var td = document.getElementsByClassName("colour"+affilates[0].gymnasium_id);
		for( var i = 0; i < td.length; i++ ){
			td[i].style.cssText = "background: #" + colour + "; width: 15px; height: 15px; border-radius: 15px;";
		}

		//  Create a new viewpoint bound
		var bounds = new google.maps.LatLngBounds ();
		bounds.extend(mapPosition)
		for( var i = 0; i < affilates.length; i++ ) {
			if( uniqGym != affilates[i].gymnasium_id ){
				countColour++;
				colour = rgbToHex(rgbArray[countColour]);
				td = document.getElementsByClassName("colour"+affilates[i].gymnasium_id);
				for ( var j = 0; j < td.length; j++ ){
					td[j].style.cssText = "background: #" + colour + "; width: 15px; height: 15px; border-radius: 15px;";
				}
			}
			uniqGym = affilates[i].gymnasium_id;
			mapPosition = new google.maps.LatLng(affilates[i].latitude, affilates[i].longitude);
			bounds.extend(mapPosition);
			var title = affilates[i].gymnasium.title;
			
			var content = '<div class = "window_info">' +
											'<h2>' + affilates[i].gymnasium.title + '</h3>' + 
											'<p>' + affilates[i].address + '</p>' +
										'</div><!--/window_info-->'
			;
			var is_man = false;
			addMarker(map, mapPosition, title, content, colour, is_man);

		};
		map.fitBounds(bounds);
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );

	}

}



// Добавление маркера на карту
function addMarker(map, latlong, title, contentString, colour, is_man){
	var div = document.getElementById("location1");
	//div.innerHTML = "Ваша широта: "  + latlong.lat() + ", долгота: " + latlong.lng();
	var pinImage;
	var pinShadow;
	if(is_man){
		pinImage = new google.maps.MarkerImage("https://maps.gstatic.com/mapfiles/ms2/micons/man.png",
	    new google.maps.Size(24, 34),
	    new google.maps.Point(0,0),
	    new google.maps.Point(13, 34));
	  pinShadow = new google.maps.MarkerImage("https://maps.gstatic.com/mapfiles/ms2/micons/man.shadow.png",
	    new google.maps.Size(40, 37),
	    new google.maps.Point(0, 0),
	    new google.maps.Point(12, 35));
	}
	else{
	  pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + colour,
	    new google.maps.Size(21, 34),
	    new google.maps.Point(0,0),
	    new google.maps.Point(10, 34));
	  pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
	    new google.maps.Size(40, 37),
	    new google.maps.Point(0, 0),
	    new google.maps.Point(12, 35));
	}

	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true,
		icon: pinImage,
    shadow: pinShadow
	};

	// create info window
	var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
	var marker = new google.maps.Marker(markerOptions);

	google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}


//____________________________________________________________________________
//
//   Geocoder and GeoDecoder
//____________________________________________________________________________

function codeLatLng(latlng, callback) {
  	geocoder.geocode({'latLng': latlng}, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
      	if (results[0]) {
        	//document.getElementById('my_address').value = results[1].formatted_address;
        	callback(results[0].formatted_address); 
      	}
    	} else {
      	alert("Geocoder failed due to: " + status);
    	}
  	});
}

function codeAddress(address, callback){
	geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
       	callback(position = results[0].geometry.location);
       	//alert(position.lat());
      } else {
        	alert("Geocode was not successful for the following reason: " + status);
      }
   });
}

/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 * 
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
function hsvToRgb(h, s, v) {
	var r, g, b;
	var i;
	var f, p, q, t;
 
	// Make sure our arguments stay in-range
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));
 
	// We accept saturation and value arguments from 0 to 100 because that's
	// how Photoshop represents those values. Internally, however, the
	// saturation and value are calculated from a range of 0 to 1. We make
	// That conversion here.
	s /= 100;
	v /= 100;
 
	if(s == 0) {
		// Achromatic (grey)
		r = g = b = v;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
 
	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i; // factorial part of h
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));
 
	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
 
		case 1:
			r = q;
			g = v;
			b = p;
			break;
 
		case 2:
			r = p;
			g = v;
			b = t;
			break;
 
		case 3:
			r = p;
			g = q;
			b = v;
			break;
 
		case 4:
			r = t;
			g = p;
			b = v;
			break;
 
		default: // case 5:
			r = v;
			g = p;
			b = q;
	}
 	var rgbBuf = {
 		r: Math.round(r * 255),
 		g: Math.round(g * 255),
 		b: Math.round(b * 255)
 	};
 	return rgbBuf;
	//return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


// assumes hue [0, 360), saturation [0, 100), lightness [0, 100)
function hsvArrayColor(numColors){
	var hsvBuf;
	var hsvArray = [];
	for(i = 0; i < 360; i += 360 / numColors) {
    hsvBuf = {
    	h: i,
    	s: 90 + Math.round(Math.random() * 10),
    	v: 80 + Math.round(Math.random() * 20)
    }
    hsvArray.push(hsvBuf);
	}
	return hsvArray;
}

function rgbArrayColor(numColors){
	var rgbArray = [];
	var hsvArray = hsvArrayColor(numColors);
	for(var i = 0 ; i < numColors; i++){
		rgbArray.push(hsvToRgb(hsvArray[i].h, hsvArray[i].s, hsvArray[i].v));
	}
	return rgbArray;
}

// convert rgb(r, g, b) to hexform
function rgbToHex (rgb){
	r = rgb.r.toString(16);
	g = rgb.g.toString(16);
	b = rgb.b.toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;

	return (r + g + b).toUpperCase(); 
}


/**
*___________________________________________________________________________
*
*   Route
*___________________________________________________________________________
*/
function route_r(city, gym_address, start_address){
  //alert(city + ' ' + gym_address + ' ' + start_address);
  var start = city + ' ' + start_address;
  var end = city + ' ' + gym_address;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  var directionsService = new google.maps.DirectionsService();


  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}