Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading'
	// wait on the villagers subscription to load
	// waitOn: function() { 
	// 	return Meteor.subscribe('villagers'); 
	// }
});

Router.map(function() {
  this.route('tweet_stream', {path: '/'});
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {path: '/profile'});

  // this.route('villagerPage', {
  //   path: '/villagers/:_id',
  //   data: function() { return Villagers.findOne(this.params._id); }
  // });
});


// turn on the loading template before the route
Router.onBeforeAction('loading');