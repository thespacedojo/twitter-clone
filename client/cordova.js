success = function(position) {
  Session.set('location', position)
}
Meteor.startup(function () {
  // The correct way
  navigator.geolocation.getCurrentPosition(success);
});
