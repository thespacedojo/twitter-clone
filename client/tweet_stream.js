Template.tweetStream.events({
  "click .tweet-btn": function(event, template) {
    tweet = template.$('.tweet-input').val();
    Tweets.insert({text: tweet}, function() {
      template.$('.tweet-input').val(null);
    });
  }
});
