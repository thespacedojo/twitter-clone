Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
  // wait on the villagers subscription to load
  // waitOn: function() {
  //  return Meteor.subscribe('villagers');
  // }
});

Router.map(function() {
  this.route('tweet_stream', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('tweets');
    },
    data: function() {
      return {
        user: Meteor.user(),
        tweets: Tweets.find({}, {sort: {tweetedAt: -1}})
      }
    }
  });
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {
    path: '/:username',
    waitOn: function() {
      return [
        Meteor.subscribe('profile', this.params.username),
        Meteor.subscribe('profileTweets', this.params.username)
      ]
    },
    data: function() {
      return Users.findOne({username: this.params.username})
    }
  });

});


// turn on the loading template before the route
Router.onBeforeAction('loading');
