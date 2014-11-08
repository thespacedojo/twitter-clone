Template.tweetStream.events({
  "click .tweet-btn": function(event, template) {
    text = template.$('.tweet-input').val();
    Tweets.insert({text: text}, function() {
      template.$('.tweet-input').val(null);
    });
  }
})

Template.tweetStream.helpers({
  settings: function() {
    return {
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
})
