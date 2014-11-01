Template.profile.created = function() {
  Session.set('tweetsSeenAt', new Date());
}

Template.profile.destroyed = function() {
  Session.set('tweetsSeenAt', null);
}

Template.profile.helpers({
  joined: function() {
    return moment(this.createdAt).format("MMMM Do, YYYY")
  },
  following: function() {
    return _.contains(Meteor.user().profile.followingIds, this._id)
  },
  newTweets: function() {
    return this.tweets(Session.get('tweetsSeenAt'), true);
  },
  tweets: function() {
    return this.tweets(Session.get('tweetsSeenAt'));
  }
});

Template.profile.events({
  'click .showTweets': function(event, template) {
    Session.set('tweetsSeenAt', new Date());
  },
  'click .follow-me': function(event, template) {
    Meteor.call('follow', template.data._id);
  }
});
