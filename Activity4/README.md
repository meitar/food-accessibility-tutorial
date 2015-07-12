# Activity 4 - Visualizing poverty differences in Bernalillo County

## Intro

In this activity we are going to color code the census block using a threshold value on the poverty rate.

Anything above the threshold will be red, anything below will be green.

## Getting to work:

Add a results `div` element in your `index.html` file to view the analysis results for step 5.

*Hint: add to the index.html file:*

```html
<div id="results"></div> <!-- activity 4: add the results div tag -->
```

Style that results `div`:

*Hint: add the following to your `style.css` file:*

```css
#results {
    float: left;
    width: 30%;
    padding-left: 20px;
}
```

In Leaflet, a `style` property passed to the options object of [the `GeoJson` constructor](http://leafletjs.com/reference.html#geojson) can supply a callback function that will style each Feature in your dataset. Add one that changes the color based on a threshold value.

*Hint: add inside the `success` statement, before the `onEachFeature` property:*

```javascript
style: function (feature) {
    if ((feature.properties.poverty)/(feature.properties.population) > threshold) {
        return {color: 'red'};
    }
    else {
        return {color: 'green'};

    }

},
```
Create a variable for change the threshold value.

*Hint: add above the ajax call added in activity 3:*

```javascript
var threshold = 0.4;
```

### Want to see the end product now? Or are you stuck?

Check out the `FinishedCode` folder for what your end product should look like.

## Going further:

* Change your threshold value to see what changes on the map!
