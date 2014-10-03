Template.profile.helpers({
  joined: function() {
    return moment(this.user.createdAt).format("MMMM Do, YYYY")
  },
  following: function() {
    if (Meteor.user() && Meteor.user().followingIds) {
      return _.contains(Meteor.user().followingIds, this.user._id);
    }
  },
  numberOfTweets: function() {
    return Counts.get('tweets');
  }
})

Template.profile.events({
  'click .follow-me': function(event, template) {
    Meteor.call('relationships/create', template.data.user._id)
  },
  'click .unfollow-me': function(event, template) {
    Meteor.call('relationships/destroy', template.data.user._id)
  }
})
