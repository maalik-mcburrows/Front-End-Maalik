function showPosition(position) {
    var x = document.getElementById("location");
    // coords of Sandy Springs
    const latlon = 33.935101 + "," + -84.360924;

// set max radius to 30 miles of given coords
        $.ajax({
          type:"GET",
          url:"https://app.ticketmaster.com/discovery/v2/events.json?radius=30&unit=miles&apikey=0AM5PnXd9P80gcqkQlWul8ARQYY1GIAY&latlong="+latlon,
          async:true,
          dataType: "json",
          success: function(json) {
                      console.log(json);
                      var e = document.getElementById("events");
                    //   shows how many events total NEEDS FEX
                      e.innerHTML = json.page.totalElements + " events found.";
                      showEvents(json);
                      initMap(position, json);
                   },
          error: function(xhr, status, err) {
                      console.log(err);
                   }
        });
        
    }
    
    function showEvents(json) {
      for(var i=0; i<json.page.size; i++) {
        
      }
    }

    
    function initMap(position, json) {
      var mapDiv = document.getElementById('map');
      var map = new google.maps.Map(mapDiv, {
        center: {lat: 33.935101, lng: -84.360924},
        zoom: 11
      });
      for(var i=0; i<json.page.size; i++) {
        addMarker(map, json._embedded.events[i]);
      }
    }
    
    function addMarker(map, event) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        map: map
      });
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      console.log(marker);
    }

    showPosition();