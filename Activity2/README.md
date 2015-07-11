# Activity 2 - Put ABQ’s grocery stores on the map

## Intro

In this activity, we'll continue using [Leaflet](https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css) to add a grocery store geojson layer onto your Open Street Map basemap.

The grocery store dataset was pre-processed (called `retail_grocery.geojson` in the `data` folder) for you by taking the following steps:

* Downloaded the business permits from the [city site](https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css)
* Open the data and filtered for grocery stores
* Geocoded
* [Converted](https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css) to geojson 

### Wondering how a grocery store was defined?

The [metadata](http://data.cabq.gov/business/busregistration/MetaData.pdf) was reviewed to understand the `DESCRIPTION` and `STATUS` columns.  The following requirements were set in order for a business to be a grocery store:

* `STATUS` had to be an active business
* `DESCRIPTION`  had to be `Retail-Grocery`

## Getting to work:

We'll make an ajax call to display the grocery stores, create a geojson layer from the result, and add the layer to our map.

<ul>**Hint: add the following code to your `script.js` file:</ul>

```javascript
    var url = "../../data/retail_grocery.geojson";
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            geojson = new L.GeoJSON(data, {
                onEachFeature: function(feature, layer){
                    layer.bindPopup(feature.properties.Name);
                }
            });
            geojson.addTo(map);
        }
    });
```

### Want to see the end product now?  Or are you stuck?

Check out [the `FinishedCode` folder](https://github.com/Smallmelo/food-accessibility-tutorial/tree/master/Activity2/FinishedCode) for what your end product should look like.

## Going further:

* Use the [Chrome dev tools](https://developer.chrome.com/devtools) to look at the attributes of the grocery stores and add other attributes to the popups
* Think you can define a grocery store better? Not interested in grocery stores?  Use the raw-ish data to define your own dataset and pre-process it using the steps under ("Grocery stores were pre-rendered for you”)
* Marker style offend you? Make a custom one
