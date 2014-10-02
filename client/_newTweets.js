Template.newTweets.created = function() {
  Session.set('tweetsSeenAt', new Date());
}

Template.newTweets.events({
  'click .showTweets': function(event, template) {
    Session.set('tweetsSeenAt', new Date());
  }
})
