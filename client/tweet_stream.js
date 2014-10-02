Template.tweet_stream.events({
  'click .tweet-btn': function(event, template) {
    text = template.$('.tweet-input').val();
    Tweets.insert({text: text}, function() {
      template.$('.tweet-input').val(undefined);
    });
  }
})

Template.tweet_stream.settings = function() { return {
  position: "bottom",
  limit: 5,
  rules: [
  {
    token: '@',
    collection: 'Users',
    field: "username",
    subscription: 'usernames',
    matchAll: true,
    template: Template.userPill
  }
  ]
}
}
