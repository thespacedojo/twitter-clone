Template.profile.events({
  "click .follow-me": function(event, template) {
    Meteor.call("follow", template.data._id)
  }
});

Template.profile.helpers({
  following: function() {
    return _.contains(Meteor.user().profile.followingIds, this._id)
  }
});
