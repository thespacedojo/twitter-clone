Meteor.publish('tweets', function() {
  return Tweets.find({}, {sort: {tweetedAt: -1}});
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {createdAt: 1, profile: 1, username: 1}});
});

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  return Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}});
});
