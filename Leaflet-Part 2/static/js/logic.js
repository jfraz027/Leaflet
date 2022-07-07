// Get your dataset.
// Store our API endpoint as queryUrl.
var queryUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  //createFeatures(data.features);
  // });

  // function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(
      `<h3>${feature.properties.place}</h3><hr><p>${new Date(
        feature.properties.time
      )}</p>`
    );
  }
  function getRadius(depth) {
    return Math.sqrt(depth / 3.1415);
  }
  function getColor(mag) {
    if (mag > 9.0) {
      return "#330000";
    }
    if (mag > 8.0) {
      return "#660000";
    }
    if (mag > 7.0) {
      return "#990000";
    }
    if (mag > 6.0) {
      return "#cc0000";
    }
    if (mag > 5.0) {
      return "#cc6600";
    }
    if (mag > 4.0) {
      return "ff8000";
    }
    if (mag > 3.0) {
      return "#ff9933";
    }
    if (mag > 2.0) {
      return "#ffb266";
    }
    if (mag > 1.0) {
      return "#ffff00";
    } else {
      return "#ffff55";
    }
  }
  function getStyle(feature) {
    return {
      color: getColor(feature.properties.mag),
      radius: getRadius(feature.geometry.coordinates[2]),
    };
  }
  function getMarker(feature, layer) {
    return L.circleMarker(layer);
  }
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature: onEachFeature,
    style: getStyle,
    pointToLayer: getMarker,
  });

  // Create the base layers.
  var street = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  var topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });

  var Stamen_Terrain = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}",
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 18,
      ext: "png",
    }
  );
  var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    Terrain: Stamen_Terrain,
    Imagery: Esri_WorldImagery,
  };

  var plates = new L.LayerGroup();
  d3.json(
    "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
  ).then(function (tectonicPlateData) {
    L.geoJson(tectonicPlateData).addTo(plates);
    plates.addTo(myMap);
    console.log(plates);
  });

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": plates,
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 2.5,
    layers: [street, earthquakes],
  });

  //Create a layer control.
  //Pass it our baseMaps and overlayMaps.
  //Add the layer control to the map.
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(myMap);
  // }
  //}
  // Create a legend to display information about our map.
  var info = L.control({
    position: "bottomright",
  });

  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    var limits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var colors = [
      "#FFFF99",
      "#FFFF00",
      "#FFB266",
      "#FF9933",
      "#FF8000",
      "#CC6600",
      "#CC0000",
      "#990000",
      "#660000",
      "#330000",
    ];

    for (var i = 0; i < limits.length; i++) {
      div.innerHTML +=
        "<li style='background-color: " +
        colors[i] +
        "'></i> " +
        limits[i] +
        (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
    }
    return div;
  };
  // Add the info legend to the map.
  info.addTo(myMap);
});
