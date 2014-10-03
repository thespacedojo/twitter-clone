Meteor.publish('tweets', function() {
  self = this
  cursor = [];
  userCursor = Users.find({_id: self.userId});
  ids = [];
  user = userCursor.fetch()
  ids.push(user[0].followingIds);
  ids.push(self.userId);
  followingIds = _.flatten(ids);

  handleUsers = userCursor.observeChanges({
    changed: function(id, doc) {
      if (id == self.userId) {
        addedIds = _.difference(doc.followingIds, followingIds);
        removedIds = _.difference(followingIds, doc.followingIds);
        console.log('Added Ids ' + addedIds);
        _.each(addedIds, function(userId) {
          console.log('Added relationship for ' + userId);
          self.added('users', userId, Users.findOne({_id: userId}));
        })
        _.each(removedIds, function(userId) {
          self.removed('users', userId);
        })
      }
    }
  });

  this.onStop(function() {handleUsers.stop()})

  cursor.push(Users.find({_id: {$in: followingIds}}));
  cursor.push(Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}}));

  return cursor
})

Meteor.publish('myFollowers', function() {
  return Users.find({_id: this.userId}, {fields: {followingIds: 1}});
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {createdAt: 1, profile: 1, username: 1}});
})

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  tweets = Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}})
  Counts.publish(this, 'tweets', tweets, {noReady: true});
  return tweets;
})

Meteor.publish('mentionedTweets', function() {
  console.log('loading mentioned tweets')
  return Tweets.find({mentionIds: {$in: [this.userId]}});
})

// Meteor.publish('relationship', function(username) {
//   user = Users.findOne({username: username});
//   return Relationships.find({followerId: this.userId, followingId: user._id})
// })

Meteor.publish('usernames', function(selector, options, collName) {
  collection = global[collName]
  sub = this
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
});
