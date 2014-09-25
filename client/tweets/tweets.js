Template.tweets.events({
  'click .compose button': function(event, template) {
    text = template.$('.tweet-input').val();
    Tweets.insert({text: text}, function() {
      template.$('.tweet-input').val(undefined);
    });
  }
})
