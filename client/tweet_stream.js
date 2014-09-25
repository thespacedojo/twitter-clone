Template.tweet_stream.events({
  'click .tweet-btn': function(event, template) {
    text = template.$('.tweet-input').val();
    Tweets.insert({text: text}, function() {
      template.$('.tweet-input').val(undefined);
    });
  }
})
