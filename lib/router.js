Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('tweets', {
    path: '/tweets',
    waitOn: function() {
      return Meteor.subscribe('tweets');
    },
    data: function() {
      return {
        tweets: Tweets.find()
      }
    }
  });

  this.route('notifications', {path: '/notifications'});

  this.route('profile', {
    path: '/:slug',
    waitOn: function() {
      return Meteor.subscribe('profile', this.params.slug)
      return Meteor.subscribe('profileTweets', this.params.slug)
    },
    data: function() {
      return Users.findOne({username: this.params.slug})
    }
  });
  
});


// turn on the loading template before the route
Router.onBeforeAction('loading');
