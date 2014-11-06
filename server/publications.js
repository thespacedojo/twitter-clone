Meteor.publish('tweets', function() {
  self = this;
  ids = [];

  userCursor = Users.find({_id: self.userId});
  user = userCursor.fetch()[0];
  ids.push(user._id);
  ids.push(user.followingIds);
  followingIds = _.chain(ids).flatten().compact().value();

  // userHandle = userCursor.observeChanges({
  //   changed: function(id, fields) {
  //     console.log("The user changed");
  //     // Code that finds added and removed ids, probably using _.difference
  //     addedIds = _.difference(followingIds, fields.followingIds)
  //     removedIds = _.difference(fields.followingIds, followingIds)
  //     followingIds = field.followingIds;
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
  //   handle.stop();
  // });

  console.log(followingIds);
  tweets = Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}});
  users = Users.find({_id: {$in: followingIds}}, {fields: {services: 0, emails: 0}});

  return [tweets, users];
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {services: 0, emails: 0}});
});

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  return Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}});
});
