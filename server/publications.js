Meteor.publish('tweets', function() {
  return Tweets.find();
});
