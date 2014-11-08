Meteor.publish('tweets', function() {
  user = Users.find({_id: this.userId});
  followingIds = user.fetch()[0].profile.followingIds || [];
  followingIds.push(this.userId);

  // userHandle = userCursor.observeChanges({
  //   changed: function(id, fields) {
  //     console.log("The user changed");
  //     // Code that finds added and removed ids, probably using _.difference
  //     addedIds = _.difference(followingIds, fields.followingIds)
  //     removedIds = _.difference(fields.followingIds, followingIds)
  //     followingIds = fields.followingIds;
  //     followingIds.push(user._id);
  //     followingIds = _.chain(followingIds).flatten().compact().value();

  //     _.each(addedIds, function(addedId) {
  //       self.added('users', addedId, Users.findOne({_id: addedId}, {fields: {username: 1, 'profile.name': 1}}));
  //       _.each(Tweets.find({userId: addedId}).fetch(), function(tweet) {
  //         self.added('tweets', tweet._id, tweet);
  //       })
  //     })

  //     _.each(removedIds, function(removedId) {
  //       self.removed('users', removedId);
  //       _.each(Tweets.find({userId: removedId}).fetch(), function(tweet) {
  //         self.removed('tweets', tweet._id);
  //       })
  //     })
  //   }
  // })

  // self.onStop(function() {
  //   userHandle.stop();
  // });
  tweets = Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}})
  users = Users.find({_id: {$in: followingIds}}, {fields: {createdAt: 1, profile: 1, username: 1}}); 
  return [tweets, users];
});

Meteor.publish('notificationTweets', function() {
  tweets = Tweets.find({mentionIds: {$in: [this.userId]}});
  userIds = _.pluck(tweets.fetch(), "userId");
  users = Users.find({_id: {$in: userIds}}, {fields: {createdAt: 1, profile: 1, username: 1}}) ;
  return [tweets, users];
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {createdAt: 1, profile: 1, username: 1}});
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
