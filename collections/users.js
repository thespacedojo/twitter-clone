Users = Meteor.users

Users.helpers({
  tweets: function() {
    return Tweets.find({userId: this._id}, {sort: {tweetedAt: -1}});
  }
})
