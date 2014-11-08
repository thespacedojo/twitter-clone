Meteor.publish('tweets', function() {
  if (! this.userId)
    return this.ready()
  self = this;
  ids = [];

  userCursor = Users.find({_id: self.userId});
  user = userCursor.fetch()[0];
  ids.push(user._id);
  ids.push(user.followingIds);
  followingIds = _.chain(ids).flatten().compact().value();

  console.log(followingIds);
  tweets = Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}});
  users = Users.find({_id: {$in: followingIds}}, {fields: {services: 0, emails: 0}});

  return [tweets, users];
});

Meteor.publish('tweetCounts', function() {
  self = this;
  count = Tweets.aggregate([{$match: {userId: {$in: [self.userId]}}},{$group: {_id: "$userId", count: {$sum: 1}}}]);
  self.added('tweetCounts', this.userId, count[0]);
  self.ready();
})

Meteor.publish('mentionedTweets', function() {
  return Tweets.find({mentionIds: {$in: [this.userId]}});
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {services: 0, emails: 0}});
});

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  return Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}});
});

Meteor.publish('usernames', function(selector, options, colName) {
  collection = global[colName];
  sub = this;
  console.log(selector)
  console.log(options)
  handle = collection.find(selector, options).observeChanges({
    added: function(id, fields) {
      sub.added('autocompleteRecords', id, fields)
    },
    changed: function(id, fields) {
      sub.changed('autocompleteRecords', id, fields)
    },
    removed: function(id) {
      sub.removed('autocompleteRecords', id)
    }
  });

  sub.ready();
  sub.onStop(function() { handle.stop() });
})
