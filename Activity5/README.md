# Activity 5 - Analysis

## Intro:
In this activity, we are going to do some analysis using [Turf](http://turfjs.org/). Specifically, we'll be calculating:

* % of our points that are in block groups that are above threshold
* % of our points that are in block groups that are below threshold
* Average number of points in block groups above threshold
* Average number of points in block groups below threshold

### What is Turf?
It is a JavaScript library that allows you to do front end spatial analysis.

## Getting to work:

Add the Turf library to your project.
<ul>**Hint: add to the header in your `index.html` file:</ul>

```html
<!-- #5 add turf -->
<script src="https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v1.4.0/turf.min.js"></script>
```

Count the number of points (grocery stores) in each of the block groups using [the `count` method in Turf](http://turfjs.org/static/docs/module-turf_count.html). How does the `count` method work? You feed it point geojson, polygon geojson, and the column name you’d like to call the “count” of points in each polygon, and it returns the polygon geoson you gave it with an extra column for the number of points inside that polygon.

First, we need to save the point geojson data we retrieve from the first ajax call. To do this, create a variable (we can call it `groceryGeoJson`) immediately before the first ajax call begins, then assign the data retrieved from that call to it.

```javascript
var groceryGeoJson; // added in Activity 5
$.ajax({
    url: url,
    dataType: 'json',
    success: function (data) {
        groceryGeoJson = data; // added in Activity 5
        geojson = new L.GeoJson(data, {
            // previous activity code here
        ]});
        geojson.addTo(map);
    }
})
```

Once this point data is retrieved, we feed it to Turf inside the `success` statement of the ajax call retrieving our other dataset:

```javascript
count = turf.count(data, groceryGeoJson, 'pt_count'); // Activity 5: count the number of grocery stores and add as an attribute to blocks
```

Filter all of the block groups that don’t have grocery stores in them using [the `remove` method in Turf](http://turfjs.org/static/docs/module-turf_remove.html). How does the `remove` method work?  You feed it geojson, the name of the column, and the value that the column must be equal to in order for that element to be deleted.

<ul>**Hint: add the following to your `script.js` file immediately following the previous `turf` statement:</ul>

```javascript
filtered = turf.remove(count, 'pt_count', 0); // Activity 5: get rid of all blocks that don't have a grocery store in them
```

### Calculations:

Declare some variables to calculate your percents and averages.

<ul>**Hint: add the following to your `script.js` file before the census geojson gets created:</ul>

```javascript
var abovePointCount = 0;
var abovePolygonCount = 0;
var belowPointCount = 0;
var belowPolygonCount = 0;

var avgAbove = 0;
var avgBelow = 0;

var percentAbove = 0;
var percentBelow = 0;
```

Get the total number of points (grocery stores) that are in blocks groups that are above/below the threshold (poverty) & the total number of polygons (block groups) that are above/below the threshold while the geojson is being created.

<ul>**Hint: add the following to your `script.js` file inside the `style` callback of the `success` statement inside the ajax call:</ul>

```javascript
style: function (feature) {
    if ((feature.properties.poverty)/(feature.properties.population) > threshold) {
        abovePolygonCount = abovePolygonCount + 1; // activity 5
        abovePointCount = abovePointCount + feature.properties.pt_count; // activity 5
        return {color: 'red'};
}
else {
    belowPolygonCount = belowPolygonCount + 1; // activity 5
    belowPointCount = belowPointCount + feature.properties.pt_count; // activity 5
    return {color: 'green'};
}
```

Calculate the average number of points (grocery stores) inside each of the the block groups categories.

<ul>**Hint: add the following to your `script.js` file immediately after the census geojson is added to the map:</ul>

```javascript
avgAbove = Math.round(abovePointCount/abovePolygonCount);
avgBelow = Math.round(belowPointCount/belowPolygonCount);
```

Calculate the percentage of points (grocery stores) inside each of the the block groups categories (above, and below).

<ul>**Hint: add the following to your `script.js` file immediately after above calculations:</ul>

```javascript
percentAbove = Math.floor(100*abovePointCount/(abovePointCount + belowPointCount));
percentBelow = Math.floor(100*belowPointCount/(abovePointCount + belowPointCount));
```

Display the results to the user in the results `div` element you created in activity 4.

<ul>**Hint: add the following to your `script.js` file:</ul>

```javascript
$('#results').html("<ul><li>\"High poverty neighborhoods\" contain " + percentAbove + "% of ABQ's grocery stores and have an average of " + avgAbove + " stores in them</li><br><li>" + "\"Low poverty neighborhoods\" contain " + percentBelow + "% of ABQ's grocery stores and have an average of " + avgBelow + " stores in them.</li></ul>");

```

All done!!

### Want to see the end product now? Or are you stuck?

Check out the FinishedCode folder for what your end product should look like.

## Going further:

* What else can we calculate?
