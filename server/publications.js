Meteor.publish('tweets', function() {
  self = this;
  cursors = [];
  userCursor = Users.find({_id: self.userId});
  user = userCursor.fetch()[0]
  ids = [];
  ids.push(user.profile.followingIds);
  ids.push(self.userId);
  followingIds = _.flatten(ids);

  // userCursor.observeChanges({
  //   changed: function(id, fields) {
  //     // Code that finds added and removed ids, probably using _.difference
  //     _.each(addedIds, function(addedId)
  //       self.added('users', addedId, Users.findOne({_id: addedId}, {fields: {username: 1, 'profile.name': 1}));
  //     }
  //   }
  // })
  cursors.push(Users.find({_id: {$in: followingIds}}, {fields: {username: 1, 'profile.name': 1}}));
  cursors.push(Tweets.find({userId: {$in: followingIds}}, {sort: {tweetedAt: -1}}));
  return cursors
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {createdAt: 1, profile: 1, username: 1}});
});

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  return Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}});
});
