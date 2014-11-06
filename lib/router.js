Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
  // wait on the villagers subscription to load
  // waitOn: function() {
  //  return Meteor.subscribe('villagers');
  // }
});

Router.map(function() {
  this.route('tweet_stream', {path: '/'});
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {path: '/profile'});

});


// turn on the loading template before the route
Router.onBeforeAction('loading');
