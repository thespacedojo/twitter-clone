Meteor.publish('tweets', function() {
  cursor = [];
  relationships = Relationships.find({followerId: this.userId})
  followingIds = relationships.map(function(relation) {return relation.followingId})
  followingIds.push(this.userId);
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
