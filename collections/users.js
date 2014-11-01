Users = Meteor.users

Users.helpers({
  tweets: function(timestamp, newer) {
    if (newer) {
      return Tweets.find({userId: this._id, tweetedAt: {$gt: timestamp}}, {sort: {tweetedAt: 1}});
    } else {
      return Tweets.find({userId: this._id, tweetedAt: {$lt: timestamp}}, {sort: {tweetedAt: 1}});
    }
  }
});
