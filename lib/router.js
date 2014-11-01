Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading'
	// wait on the villagers subscription to load
	// waitOn: function() { 
	// 	return Meteor.subscribe('villagers'); 
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
        tweets: Tweets.find(),
        user: Meteor.user()
      }
    },
    onBeforeAction: function() {
      if (!Meteor.loggingIn()) {
        if (Meteor.user()) {
          this.next();
        } else {
          // Session.set('fromWhere', router.path);
          Router.go('/sign-in');
          return Session.set('entryError', t9n('error.signInRequired'));
        }
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
      return Users.findOne({username: this.params.username});
    }
  });

  // this.route('villagerPage', {
  //   path: '/villagers/:_id',
  //   data: function() { return Villagers.findOne(this.params._id); }
  // });
});


