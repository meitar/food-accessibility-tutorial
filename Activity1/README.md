<h1>Activity 1 - Setup your first web map</h1>

<h2>Intro:</h2>

In this activity, we'll be using <a href="http://leafletjs.com/">Leaflet</a> to create a map and add an Open Street Map basemap to it.

<h2>Getting to work:</h2>

Start by creating three seperate blanks files: `index.html`, `style.css`, and `script.js` and get your index.html setup:

*Hint: add the following to your blank `index.html` file*

```html
<html>
<head>
	<title>Fun titles!!</title>
</head>
<body>

</body>
</html>

```


Include Leaflet CSS & js files in the project.

*Hint: add the following to the header of your `index.html` file:*

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>
```

Include jQuery in your header.

*Hint: add the following to the header of your `index.html` file:*

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
```

Create a map div element.

*Hint: add the following inside the body tag of your `index.html`:*

```html
<div id="map"></div>
```

Setup your `style.css` setup, and include it in your `index.html` file:

```css
#map { height: 600px; 
        float: left;
        width: 65%;    
    }
```

```html
<link rel="stylesheet" href="style.css" />
```

After the document is ready, instantiate your map object, and include your JavaScript in your HTML document.  Set its center, and zoom level.

*Hint: add the following to your `script.js` file:*

```javascript
$(document).ready(function() {

	var map = L.map('map', {
        center: [35.104602, -106.628414],
        zoom: 11
    });

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a>',
	    maxZoom: 18
	}).addTo(map);

});
```

*Hint: add the following to your `index.html` file:*

```html
<script src="script.js"></script>
```

<h2>Going further:</h2>
If you want to do more, try changing the zoom level of your map or the center point
