Template.profile.helpers({
  newTweets: function() {
    return this.tweets(Session.get('tweetsSeenAt'), true);
  },
  tweets: function() {
    return this.tweets(Session.get('tweetsSeenAt'));
  },
  joined: function() {
    return moment(this.createdAt).format("MMMM Do, YYYY")
  },
  following: function() {
    return Relationships.findOne({followerId: Meteor.userId(), followingId: this._id})
  }
})

Template.profile.events({
  'click .follow-me': function(event, template) {
    Meteor.call('relationships/create', template.data._id)
  },
  'click .unfollow-me': function(event, template) {
    Meteor.call('relationships/destroy', template.data._id)
  }
})
