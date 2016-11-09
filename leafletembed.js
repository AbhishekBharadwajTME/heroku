function initmap() {
	// set up the map
	var map = L.map('map',{center: [53.3064, -6.8783], zoom: 10});
	var newHeatPoints = [];
  // OSM Baselayer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

	var kildareStyle = {
 	"fillColor": "#CC9933",
 	"color": "#000000",
 	"weight": 2,
 	"fillOpacity": 0.2
 	};
	//var kildare = new L.GeoJSON.AJAX('points.geojson', {style:kildareStyle}).addTo(map);
	var heat = L.heatLayer(heat_points, {radius:12,blur:25,maxZoom:11}).addTo(map);
	console.log(map.getBounds());
	var zoomCount=0;
	var dragCount=0;
	map.on({
	    zoomend: function (e) {
							//console.log("Zoom number: "+zoomCount);
	            //console.log("NorthEast latlon: "+map.getBounds().getNorthEast());
							//console.log("SouthWest latlon: "+map.getBounds().getSouthWest());
							//console.log("NorthWest: "+map.getBounds().getNorthWest());
							//console.log("SouthEast: "+map.getBounds().getSouthEast());
							//console.log("SouthEast: "+map.getBounds().getSouthEast());
							zoomCount++;
	    },
			dragend: function (e) {
							//console.log("Drag number: "+dragCount);
	            //console.log("NorthEast latlon: "+map.getBounds().getNorthEast());
							//console.log("SouthWest latlon: "+map.getBounds().getSouthWest());
							//console.log("South: "+map.getBounds().getSouth());
						  //console.log("North: "+map.getBounds().getNorth());
							//console.log("East: "+map.getBounds().getEast());
							//console.log("West: "+map.getBounds().getWest());
							dragCount++;
	    }
	});

	var socket = io.connect("http://nodejsbackend-trial.44fs.preview.openshiftapps.com/");
	socket.send();
	socket.on('connect', function () {
		socket.on('graphview', function (msg) {
			msg.data.forEach(function(entry) {
				newHeatPoints.push(entry.coordinates.reverse())
			});
			var heat = L.heatLayer(newHeatPoints, {radius:12,blur:25,maxZoom:11}).addTo(map);
		});
	});
}
