import Ember from 'ember';
import GoogleMapMarkerView from '../views/google-map/marker';

export default GoogleMapMarkerView.extend({
  googleEvents: {
    mouseover: {
      method: function(eventName, view) {
        var parkingSpotModel = view.controller.get('model');
        parkingSpotModel.set('icon', 'images/parking_marker.png');
      }
    },
    mouseout: {
      method: function(eventName, view) {
        var parkingSpotModel = view.controller.get('model');
        parkingSpotModel.set('icon', 'images/parking_marker_green.png');
      }
    },
   click: {
     method: function(eventName, view) {
       var parkingSpotModel = view.controller.get('model');
       this.send('spotSelected', parkingSpotModel.getProperties('address', 'description', 'price', 'distance', 'lat', 'lng'));
     }
   }
 }
});
