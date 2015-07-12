// Activity #5

$(document).ready(function() {

    // Activity 1
    var map = L.map('map', {
        center: [35.104602, -106.628414],
        zoom: 11
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

    // Activity 2
    var url = "../../data/retail_grocery.geojson";
    var groceryGeoJson;
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            groceryGeoJson = data;
            geojson = new L.GeoJSON(data, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.Name);
                }
            });
            geojson.addTo(map);
        }
    });

    // Activity 3 - see the alternate_citysdk_ajax_call.js for the request used to grab the census.geojson data below
    var threshold = 0.4; // Activity 4

    // Activity 5
    var abovePointCount = 0;
    var abovePolygonCount = 0;
    var belowPointCount = 0;
    var belowPolygonCount = 0;
    var avgAbove = 0;
    var avgBelow = 0;
    var percentAbove = 0;
    var percentBelow = 0;

    var url = "../../data/census.geojson";
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            count = turf.count(data, groceryGeoJson, 'pt_count'); // Activity 5: count the number of grocery stores and add as an attribute to blocks
            filtered = turf.remove(count, 'pt_count', 0); // Activity 5: get rid of all blocks that don't have a  grocery store in them
            geojson = new L.GeoJSON(data, {
                style: function (feature) {
                    if ((feature.properties.poverty)/(feature.properties.population) > threshold) {
                        abovePolygonCount = abovePolygonCount + 1;
                        abovePointCount = abovePointCount + feature.properties.pt_count;
                        return {color: 'red'};
                    }
                    else {
                        belowPolygonCount = belowPolygonCount + 1;
                        belowPointCount = belowPointCount + feature.properties.pt_count;
                        return {color: 'green'};
                    }
               },
                onEachFeature: function(feature, layer){
                    layer.bindPopup("poverty: " + Math.floor(100*parseInt(feature.properties.poverty)/(feature.properties.population)) + "%");
                }
            });
            geojson.addTo(map);

            // Activity 5 - Calculate the average number of points (grocery stores) in each of the block group categories (above, below threshold)
            avgAbove = Math.round(abovePointCount/abovePolygonCount);
            avgBelow = Math.round(belowPointCount/belowPolygonCount);

            //Activity 5 - Calculate the percent of grocery stores in each of the block group categories (above, below threshold)
            percentAbove = Math.floor(100*abovePointCount/(abovePointCount + belowPointCount));
            percentBelow = Math.floor(100*belowPointCount/(abovePointCount + belowPointCount));

            // Activity 5: display results
            $('#results').html("<ul><li>\"High poverty neighborhoods\" contain " + percentAbove + "% of ABQ's grocery stores and have an average of " + avgAbove + " stores in them</li><br><li>" + "\"Low poverty neighborhoods\" contain " + percentBelow + "% of ABQ's grocery stores and have an average of " + avgBelow + " stores in them.</li></ul>");
        }
    });

});
