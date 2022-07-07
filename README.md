# Leaflet
## Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. My assignment is to assist in the exciting new project!

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

![image](https://user-images.githubusercontent.com/99145651/177842021-8d53324b-70ca-468b-9c31-371a3323804c.png)


## Goals

The goal of this project consist of two parts: 

* Part 1: Create the Earthquake Visualization 

* Part 2: Gather and Plot More Data 

### Part 1: Create the Earthquake Visualization

![image](https://user-images.githubusercontent.com/99145651/177845562-2dc6363e-6b38-4590-b835-1b648fe2ee71.png)

Steps for Part 1 include the following steps:

1. Get your dataset.  

   * The USGS provides earthquake data in a number of different formats, updated every five minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize. 

![image](https://user-images.githubusercontent.com/99145651/177845998-663bc9cf-fba6-4f2f-8c81-ad85eb325717.png)

  * Click a dataset (such as "All Earthquakes from the Past 7 Days"), that provides a JSON representation of that data.
 * Use the URL of this JSON to pull in the data for the visualization. 

 ![image](https://user-images.githubusercontent.com/99145651/177846479-cb752fd8-3331-42f9-a012-56f9477e3db0.png)

2. Import and visualize the data: 

   * Use Leaflet to create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear          larger, and earthquakes with greater depth should appear darker in color.

       * **Note:** The depth of the earth are found as the third coordinate for each earthquake.

   * Include popups that provide additional information about the earthquake when its associated marker is clicked.

   * Create a legend that will provide context for the map data.

   

- - -

### Part 2: Gather and Plot More Data 

The USGS requests plotting  of a second dataset on the map to illustrate the relationship between tectonic plates and seismic activity. This dataset will merge to visualize alongside the original data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

The image produces is as follows:

![image](https://user-images.githubusercontent.com/99145651/177850841-34bbaee8-da5c-440c-9067-e97ee95c2791.png)

Perform the following tasks: 

* Plot the tectonic plates dataset on the map in addition to the earthquakes.

* Add other base maps to choose from.

* Put each dataset into separate overlays that can be turned on and off independently.

* Add layer controls to our map.
