 //#4 - instantiate your census module
    sdk = new CitySDK();
	census = sdk.modules.census;
	census.enable("8a67d768609eac8ce7470ea406b1fcd7f1170cbd");


	var request = {
		"lat": 35.104602,
		"lng": -106.628414,
		"level": "tract",
		 "sublevel": true,
		"container": "place",
		"variables": [
		    "income"
		]
	};


	census.GEORequest(request, function(response) {
			
		  L.geoJson(response,

		  {
		  	
		  	onEachFeature: function (feature, layer) {
       	    	layer.bindPopup("poverty: " + Math.floor(100*parseInt(feature.properties.poverty)/(feature.properties.population)) + "%");
       	 
  		  }

		  }

		  ).addTo(map);


	});