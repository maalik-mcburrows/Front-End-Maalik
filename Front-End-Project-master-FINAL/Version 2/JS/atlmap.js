//showcase the Atlanta Map
function showPosition(position) {
    let x = document.getElementById("location");
    // coords of Atlanta
    const latlon = 33.753746 + "," + -84.386330;

// set max radius to 30 miles of given coords
        $.ajax({
          type:"GET",
          url:"https://app.ticketmaster.com/discovery/v2/events.json?radius=30&unit=miles&apikey=0AM5PnXd9P80gcqkQlWul8ARQYY1GIAY&latlong="+latlon,
          async:true,
          dataType: "json",
          success: function(json) {
                      console.log(json);
                      var e = document.getElementById("events");
                    //   shows how many events total NEED FIX
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
      for(let i=0; i<json.page.size; i++) {
        
      }
    }

    
    function initMap(position, json) {
      let mapDiv = document.getElementById('map');
      let map = new google.maps.Map(mapDiv, {
        center: {lat: 33.753746, lng: -84.386330},
        zoom: 11
      });
      for(let i=0; i<json.page.size; i++) {
        addMarker(map, json._embedded.events[i]);
      }
    }
    
    function addMarker(map, event) {
      let contentString = "An event is occurring here!"//$('#classification').html(eventObject.data[""]);  -- add this when combining into events page to call
      let infoWindow = new google.maps.InfoWindow({
          content : contentString
      });  
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        map: map
      });
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      marker.addListener("click", function(){
          infoWindow.open(map, marker);
      });
    }