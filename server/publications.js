Meteor.publish('tweets', function() {
  return Tweets.find({}, {sort: {tweetedAt: -1}});
});

Meteor.publish('profile', function(username) {
  return Users.find({username: username}, {fields: {services: 0, emails: 0}});
});

Meteor.publish('profileTweets', function(username) {
  user = Users.findOne({username: username});
  return Tweets.find({userId: user._id}, {sort: {tweetedAt: -1}});
});
