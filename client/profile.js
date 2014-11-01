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
  }
});
