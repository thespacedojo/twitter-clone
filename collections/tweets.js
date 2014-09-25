Tweets = new Mongo.Collection('tweets')

Tweets.helpers({
  username: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user) {
      return user.username;
    }
  },

  userFullName: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user && user.profile && user.profile.name) {
      return user.profile.name;
    }
  }
})

Tweets.before.insert(function (userId, doc) {
  doc.tweetedAt = Date.now();
  doc.userId = userId;
});

Tweets.allow({
  insert: function(userId, doc) {
    return true;
  },

  update: function(userId, doc, fields, modifier) {
    return false;
  },

  remove: function(userId, doc) {
    return doc.userId === userId;
  }
})
