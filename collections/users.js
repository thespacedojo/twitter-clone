Users = Meteor.users

Users.helpers({
  tweets: function() {
    return Tweets.find({userId: this._id}, {sort: {tweetedAt: -1}});
  }
})

Meteor.methods({
  follow: function(followId) {
    Users.update(this.userId, {$push: {"profile.followingIds": followId}});
  }
});
