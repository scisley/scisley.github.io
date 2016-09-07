
var RetroMobility = function() {
    
  // psiTurk.showPage("map.html");
  // psiTurk.recordTrialData({'phase':'map', 'status':'begin'});
  
  var map = L.map("map").setView([40.413, -98.701], 4);
  
  map.doubleClickZoom.disable();
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'scisley.kog7mjop',
      accessToken: 'pk.eyJ1Ijoic2Npc2xleSIsImEiOiJjaXF2cmRkcHIwMDI5ZnhrcTZhbDI1Y2NsIn0.bchhhin8g0bFW5_L1-WrvA'
      // accessToken: 'pk.eyJ1IjoibGFiYWNjb3VudCIsImEiOiI2ZmNkZWI0MWU5YmVmNmViNmM0NzlhYTg0Yzg4MDY2YiJ9.CGCbfmadPkOtlguhb_5Xpg'
  }).addTo(map);
  
  function onMapClick(e) {
      console.log("map click at: " + e.latlng);    
  }
  
  // ############ Start Backbone Definitions ##################
  var Destination = Backbone.Model.extend({
    defaults: {
      title: 'No Title',
      mode: 'unset',
      baggage: false,
      carseat: false,
      professional: false,
      passengers: false,
      arrive: '',
      depart: '',
      active: false
    }
  });
  
  function addDestination(latlng) {
      console.log(latlng.toString());
      // Create a backbone model
      destination = new Destination({latlng: latlng, title: "Event " + eventCount++});
      destinations.add(destination);   
  }
  
  var DestinationCollection = Backbone.Collection.extend({
      model: Destination,
  });
  
  var calendarHtml = $("#calendar-entry-template").html();
  
  var CalendarItem = Backbone.View.extend({
      template: _.template( calendarHtml ),
      tagName: "div",
      className: "calendarEntry",
      
      initialize: function() {
          this.listenTo(this.model, "change:arrive change:depart", this.updateTimes);
      },
      
      events: {
          "change .modeSelect":   "mode",
          "change .title":        "title",
          "change .arrive":       "arrive",
          "change .depart":       "depart",
          "change .carseat":      "carseat",
          "change .professional": "professional",
          "change .passengers":   "passengers",            
          "change .baggage":      "baggage",
          "click .deleteEvent":   "deleteEvent",
          "click .insertEvent":   "insertEvent",
          "mouseenter .title":    "modelActive", 
          "mouseleave .title":    "modelInactive" 
      },
      
      modelActive: function() { 
          console.log("calendar item active " + this.model.get("title"));
          this.model.set("active", true); 
      },
      modelInactive: function() { 
          console.log("calendar item inactive " + this.model.get("title"));
          this.model.set("active", false); 
      },
      
      render: function() {
          this.$el.html( this.template(this.model.attributes) );
          this.$(".modeSelect").val(this.model.get("mode"));
          this.$(".carseat").prop("checked", this.model.get("carseat") === true);
          this.$(".professional").prop("checked", this.model.get("professional") === true); 
          this.$(".passengers").prop("checked", this.model.get("passengers") === true);             
          this.$(".baggage").prop("checked", this.model.get("baggage") === true); 
          
          this.updateTimes();
          
          return this;
      },
      
      mode: function(e) {
          console.log(e);
          this.model.set("mode", e.target.value);
      },
      
      title: function(e) {
          console.log(e);
          this.model.set("title", e.target.value);
      },
      
      updateTimes: function() {
          // this.$(".arrive").timepicker();
          // this.$(".depart").timepicker();
          // this.$(".arrive").timepicker('setTime', new Date(this.model.get("arrive")));
          // this.$(".depart").timepicker('setTime', new Date(this.model.get("depart")));
      },
      
      arrive: function(e) {
          // this.model.set("arrive", $(e.target).timepicker('getTime').getTime() );
          if (this.model.get("arrive") > this.model.get("depart"))
              this.model.set("depart", "");
      },

      depart: function(e) {
          // this.model.set("depart", $(e.target).timepicker('getTime').getTime() );
      },
      
      carseat: function(e) {
          this.model.set("carseat", e.target.checked === true);
      },
      
      baggage: function(e) {
          this.model.set("baggage", e.target.checked === true);
      },
      
      professional: function(e) {
          this.model.set("professional", e.target.checked === true);
      },
      
      passengers: function(e) {
          this.model.set("passengers", e.target.checked === true);
      },
      
      deleteEvent: function(e) {
          this.model.destroy();
      },
      
      insertEvent: function(e) {
          this.model.trigger("insertEvent", this.model); 
      }
      
  });
  
  
  var CalendarView = Backbone.View.extend({
      model: DestinationCollection,
      
      initialize: function() {
          this.listenTo(this.model, "add remove", this.render);
          this.listenTo(this.model, "insertEvent", this.insertEvent);
      },
      
      render: function() {
          this.$el.empty();
          for (var i=0; i<this.model.length; ++i) {
              var attrs = {model: this.model.at(i)};
              var calendarItem = new CalendarItem(attrs);
              this.$el.append(calendarItem.$el);
              calendarItem.render();
              if (i===0) {
                  var tDate = new Date();
                  tDate.setHours(0);
                  tDate.setMinutes(0);
                  tDate.setSeconds(0,0);
                  this.model.at(i).set("arrive",tDate.getTime());
                  calendarItem.$(".modeBox").hide();
                  calendarItem.$(".arrive").prop({disabled: true, checked: false});
                  calendarItem.$(".baggage").prop({disabled: true, checked: false});
                  calendarItem.$(".carseat").prop({disabled: true, checked: false});
                  calendarItem.$(".professional").prop({disabled: true, checked: false});
                  calendarItem.$(".passengers").prop({disabled: true, checked: false});
              } else {
                  if (this.model.at(i).get("arrive") === "") {
                      this.model.at(i).set("arrive", this.model.at(i-1).get("depart"));
                      this.model.at(i).set("depart", this.model.at(i-1).get("depart")+60*60*1000);
                  }
              }
              
          }
          return this;
      },
      
      insertEvent: function(afterModel) {
          var index = this.model.indexOf(afterModel);
          
          if (index===this.model.length-1) {
              // No sense inserting new element after final, where would it go?
              alert("To add a new point on the end, double click on the map");
          } else {
              var l1 = afterModel.get("latlng");
              var l2 = this.model.at(index+1).get("latlng");
              var latlng = L.latLng( (l1.lat+l2.lat)/2, (l1.lng+l2.lng)/2 );
              destination = new Destination({latlng: latlng, title: "Event " + eventCount++});
              destinations.add(destination, {at: index+1});
          }
          
      }
      
  });
  
  var MarkerView = Backbone.View.extend({
      /*
          Backbone views have trouble with leaflet because the markers don't 
          fit nicely into the DOM object model. So, this leaves the actual
          Backbone DOM element orphaned (not added to page) and defines 
          markers separately.
      */
      initialize: function() {
          this.listenTo(this.model, "change:active change:title", this.showActive);
          this.marker = undefined;
      },
  
      render: function(layerGroup) {
          var myIcon = L.divIcon({className: 'my-div-icon'});
          this.marker = L.marker(this.model.get("latlng"), 
              {draggable: true, 
              icon: myIcon,
              riseOnHover: true}
          ).bindLabel(this.model.get("title"), {noHide:true});
          
          layerGroup.addLayer(this.marker);
          var that = this;
          this.marker.on("dragend", function(e) {
              that.model.set("latlng", e.target._latlng);
          });
          this.marker.on("click", function(e) {
              console.log(that.model.get("latlng").toString());
          });
      },
      
      showActive: function(active) {
          console.log(this.model);
          if (this.model.get("active") === true) {
              this.marker.label.setContent("<span class='activeMarker'>" + this.model.get("title") + "</span>");
              console.log("active: " + this.model.get("title"));
          } else {
              console.log("inactive: " + this.model.get("title"));
              this.marker.label.setContent("<span class='inactiveMarker'>" + this.model.get("title") + "</span>");
          }
                              
      },           
      
  });
  
  var MapView = Backbone.View.extend({
      model: DestinationCollection,
      
      initialize: function() {
          this.listenTo(this.model, "add change:latlng remove", this.render);
                      
          this.markerLayer = L.layerGroup();
          this.markerViews = [];
          this.polylineLayer = null;
      },
      
      render: function() {
          map.removeLayer(this.markerLayer);
          if (this.polylineLayer != null) map.removeLayer(this.polylineLayer);
          
          var markerLatLngs = [];
          $.each(this.markerViews, function(i, view) { 
              view.remove(); 
          });
          this.markerViews = [];
          
          this.markerLayer = L.layerGroup();
          for (var i=0; i<this.model.length; ++i) {
              var markerView = new MarkerView({model: this.model.at(i)});
              markerView.render(this.markerLayer);
              this.markerViews.push(markerView);
              markerLatLngs.push(this.model.at(i).get("latlng"));
          }
          this.markerLayer.addTo(map);            
          
          this.polylineLayer = L.polyline(markerLatLngs)
          this.polylineLayer.on("dblclick", function() { console.log("test dblclick"); });
          
          this.polylineLayer.addTo(map);
          
          return this;
      }
  });
    
  // ############  End Backbone Definitions ##################
  
  var destinations = new DestinationCollection();
  var calendar = new CalendarView({el: $("#calendar"), model: destinations});
  var mapView = new MapView({model: destinations});
  var eventCount = 1;
  //var coordinates = [ [39.738, -105.168], [39.742, -105.154] ];
  
  map.on("dblclick", function(e) {
      addDestination(e.latlng);
  });
    
    
  $("#next").click(function () {
    
    /* Validation */
    var valid = true;
    
    if (destinations.size() <= 1) {
      alert("You must specify more than one location. Use the last day\n" +
      "where you travelled outside your home.");
      valid = false;
    }
    
    // Check that all travel modes are specified
    destinations.each(function(destination, i) {
      if (!valid) return null;
      var title = destination.get("title");
      if (destination.get("mode") === "unset" && i > 0) {
        alert("You did not specify a travel mode for\nevent number " + (i + 1) +
            ", entitled " + title + ".");
        valid = false;
      } else if (destination.get("arrive") === "") {
        alert("Event number " + (i+1) + ", entitled " + title + " has no arrival time");
        valid = false;
      } else if (destination.get("depart") === "") {
        alert("Event number " + (i+1) + ", entitled " + title + " has no departure time");
        valid = false;
      } else if (Date.parse(destination.get("arrive")) > Date.parse(destination.get("depart"))) {
        alert("Event number " + (i+1) + ", entitled " + title + " has an arrival time after its departure time");
        valid = false;
      } else if (i > 0 && Date.parse(destinations.at(i-1).get("depart")) > Date.parse(destination.get("arrive"))) {
          alert("Event number " + (i+1) + ", entitled " + title + 
                " has an arrival time before the previous event's departure time.");
          valid = false;
      }
         
    });
  });   
}

$(window).load( function() {
  var currentview = new RetroMobility();
});