Meteor.publish('tweets', function() {
  cursor = [];
  relationships = Relationships.find({followerId: this.userId})
  followingIds = relationships.map(function(relation) {return relation.followingId})
  followingIds.push(this.userId);
  // self = this
  // handleUsers = relationships.observeChanges({
  //   added: function(id, fields) {
  //     console.log('Added a relationship ' + fields.followingId);
  //     self.added('users', fields.followingId, Users.findOne({_id: fields.followingId}));
  //   },
  //   removed: function(id, fields) {
  //     self.removed('users', fields.followingId);
  //   }
  // });
  // handleTweets = relationships.observeChanges({
  //   added: function(id, fields) {
  //     tweets = Tweets.find({userId: fields.followingId})
  //     _.each(tweets, function(tweet) {
  //       self.added('tweets', tweet._id, tweet);
  //     });
  //   },
  //   removed: function(id, fields) {
  //     tweetIds = Tweets.find({userId: fields.followingId}).map(function(tweet) {return tweet._id});
  //     _.each(tweetIds, function(id) {
  //       self.removed('tweets', id);
  //     })
  //   }
  // });
  cursor.push(Users.find({_id: {$in: followingIds}}));
  cursor.push(Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}}));

  return cursor
})

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {createdAt: 1, profile: 1, username: 1}});
})

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  return Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}});
})

Meteor.publish('relationship', function(username) {
  user = Users.findOne({username: username});
  return Relationships.find({followerId: this.userId, followingId: user._id})
})
