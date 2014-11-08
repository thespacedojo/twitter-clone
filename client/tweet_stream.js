Counts = new Mongo.Collection('tweetCounts')

Template.tweetStream.created = function() {
  Meteor.subscribe('tweetCounts');
}

Template.tweetStream.events({
  "click .tweet-btn": function(event, template) {
    tweet = template.$('.tweet-input').val();
    loc = {}
    if (Session.get('location'))
      loc = {lat: Session.get('location').coords.latitude, long: Session.get('location').coords.longitude}
    Tweets.insert({text: tweet, location: loc}, function() {
      template.$('.tweet-input').val(null);
    });
  }
});

Template.tweetStream.helpers({
  tweetCount: function() {
    agg = Counts.findOne({_id: Meteor.userId()})
    if (agg)
      return agg.count
  },
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
