Tweets = new Mongo.Collection('tweets')

Tweets.before.insert(function(userId, doc) {
  doc.tweetedAt = moment()._d;
  doc.userId = userId;
  doc.mentions = doc.text.match(/@\w+/gm);
  doc.mentionIds = _.map(doc.mentions, function(mention) {
    user = Meteor.users.findOne({username: mention.substr(1)})
    if (user) {
      return user._id;
    }
  })
})

Tweets.helpers({
  username: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user) {
      return user.username
    }
  },
  userFullName: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user && user.profile && user.profile.name) {
      return user.profile.name;
    }
  }
})

Tweets.allow({
  insert: function(userId, doc) {
    if (userId) {
      return true;
    }
  },

  update: function(userId, doc, fields, modifier) {
    return false;
  },

  remove: function(userId, doc) {
    return doc.userId === userId;
  }
})
