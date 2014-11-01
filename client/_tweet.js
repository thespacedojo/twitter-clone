Template.tweet.helpers({
  tweetedTime: function() {
    return moment(this.tweetedAt).fromNow();
  }
})
