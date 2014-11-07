Tweets = new Mongo.Collection('tweets')

processTweet = function(text) {
  if (Meteor.isServer) {
    if (_.contains(text, "@")) {
      mentions = _.select(text.split(" "), function(string) {return _.contains(string, "@")})
      usernames = _.map(mentions, function(mention) {return mention.substring(1)})
      return _.pluck(Users.find({username: {$in: usernames}}).fetch(), "_id")
    }
  }
}

linkTweet = function(text) {
  if (Meteor.isServer) {
    if (_.contains(text, "@")) {
      mentions = _.select(text.split(" "), function(string) {return _.contains(string, "@")})
      _.each(mentions, function(username) {
        text = text.replace(username, '<a href="/' + username.substring(1) + '">' + username + '</a>');
      });
      return text;
    }
  }
}

Tweets.before.insert(function(userId, doc) {
  doc.tweetedAt = new Date();
  doc.userId = userId;
  doc.mentionIds = processTweet(doc.text);
  doc.linkedText = linkTweet(doc.text);
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
