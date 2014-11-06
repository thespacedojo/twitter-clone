Tweets = new Mongo.Collection('tweets')

Tweets.before.insert(function(userId, doc) {
  doc.tweetedAt = new Date();
  doc.userId = userId;
});

Tweets.helpers({
  username: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user)
      return user.username;
  },
  fullName: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user && user.profile)
      return user.profile.name;
  }
});

Tweets.allow({
  insert: function(userId, doc) {
    if (userId)
      return true;
  },
  update: function(userId, doc, fields, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return doc.userId === userId;
  }
});
