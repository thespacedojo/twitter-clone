Template.profile.rendered = function() {
  Session.set('tweetsSeenAt', new Date()); 
}

Template.profile.events({
  "click .follow-me": function(event, template) {
    Meteor.call("follow", template.data._id)
  },
  "click .unfollow-me": function(event, template) {
    Meteor.call("unfollow", template.data._id)
  },
  "click .showTweets": function(event, template) {
    Session.set('tweetsSeenAt', new Date());
  } 
});

Template.profile.helpers({
  joined: function() {
    return moment(this.createdAt).format("MMMM Do, YYYY");
  },
  newTweets: function() {
    return this.tweets(Session.get('tweetsSeenAt'), true)
  },
  tweets: function() {
    return this.tweets(Session.get('tweetsSeenAt'), false)
  }, 
  following: function() {
    return _.contains(Meteor.user().profile.followingIds, this._id)
  }
});
