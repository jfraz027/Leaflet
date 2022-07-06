// Get your dataset. 
// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  })

  var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
})
    // // We create the dark view tile layer that will be an option for our map.
    var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20

});

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Terrain": Stamen_Terrain,
    "Dark": CartoDB_DarkMatterNoLabels
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = [0, 1, 2, 3, 4 , 5]
    var labels = []
  
    for (let i = 0; i < limits.length; i++) {
      div.innerHTML +=
      '<i style="background:' + colorScale(limits[i] + 1) + '"></i> ' +
      limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
      }
  
  return div;
  };
  legend.addTo(map);




}









// // Add console.log to check to see if our code is working.
// console.log("working");

// // We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });
// // We create the tile layer that will be an option for our map.
// let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data &copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });
// // We create the dark view tile layer that will be an option for our map.
// let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });

// // Create the map object with center, zoom level and default layer.
// let map = L.map('mapid', {
// 	center: [39.5, -98.5],
// zoom: 3,
// 	layers: [streets]
// })

// // Create a base layer that holds both maps.
// let baseMaps = {
// 	"Streets": streets,
//   "Satellite": satelliteStreets,
//   "Dark": dark
//   };

// // Create the earthquake layer for our map.
// let earthquakes = new L.LayerGroup();

// // Create the tectonic layer for our map.
// let tectonic = new L.LayerGroup();

// // We define an object that contains the overlays.
// // This overlay will be visible all the time.
// let overlays = {
//     Earthquakes: earthquakes,
//     Tectonic: tectonic
//   };

// // Then we add a control to the map that will allow the user to change
// // which layers are visible.
// L.control.layers(baseMaps, overlays).addTo(map);

// // Accessing the Tectonicplates GeoJSON URL.
// let tectonicData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// //Create a style for the lines.
// let myStyle = {
// 	color: "#ff00ff",
// 	weight: 2
// }

// // Retrieve the tectonic GeoJSON data.
// d3.json(tectonicData).then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     style: myStyle
//   }).addTo(tectonic);
      
//       // Then we add the tectonic layer to our map.
//       tectonic.addTo(map);

//       // This function returns the style data for each of the earthquakes we plot on
// // the map. We pass the magnitude of the earthquake into two separate functions
// // to calculate the color and radius.
// function styleInfo(feature) {
//   return {
//     opacity: 1,
//     fillOpacity: 1,
//     fillColor: getColor(feature.properties.mag),
//     color: "#000000",
//     radius: getRadius(feature.properties.mag),
//     stroke: true,
//     weight: 0.5
//   };
// }

// // This function determines the color of the circle based on the magnitude of the earthquake.
// function getColor(magnitude) {
//   if (magnitude > 5) {
//     return "#ea2c2c";
//   }
//   if (magnitude > 4) {
//     return "#ea822c";
//   }
//   if (magnitude > 3) {
//     return "#ee9c00";
//   }
//   if (magnitude > 2) {
//     return "#eecc00";
//   }
//   if (magnitude > 1) {
//     return "#d4ee00";
//   }
//   return "#98ee00";
// }

// // This function determines the radius of the earthquake marker based on its magnitude.
// // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
// function getRadius(magnitude) {
//     if (magnitude === 0) {
//         return 1;
//       }
//       return magnitude * 4;
//   }

// // Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// // Creating a GeoJSON layer with the retrieved data.
// L.geoJson(data, {
//   // We turn each feature into a circleMarker on the map.
//   pointToLayer: function(feature, latlng) {
//       console.log(data);
//       return L.circleMarker(latlng);
//     },
//   // We set the style for each circleMarker using our styleInfo function.
// style: styleInfo,
//   // We create a popup for each circleMarker to display the magnitude and
//   //  location of the earthquake after the marker has been created and styled.
//   onEachFeature: function(feature, layer) {
//   layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
// }
// }).addTo(earthquakes);

//   // Then we add the earthquake layer to our map.
//   earthquakes.addTo(map);
  
  
//   // Create a legend control object.
//   var legend = L.control({
//       position: 'bottomright'
//   });
//   // Then add all the details for the legend.
//   legend.onAdd = function () {
      
//       var div = L.DomUtil.create('div', 'info legend');
//       const magnitudes = [0, 1, 2, 3, 4, 5];
//       const colors = [
//           "#98ee00",
//           "#d4ee00",
//           "#eecc00",
//           "#ee9c00",
//           "#ea822c",
//           "#ea2c2c"
//       ];
      
//       // Looping through our intervals to generate a label with a colored square for each interval.
//       for (var i = 0; i < magnitudes.length; i++) {
//           console.log(colors[i]);
//           div.innerHTML +=
//           "<i style='background: " + colors[i] + "'></i> " +
//           magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
//       }
//       return div;
//   };
//   legend.addTo(map);
// });
// });