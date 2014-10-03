Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
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
        tweets: Tweets.find({tweetedAt: {$lte: Session.get('tweetsSeenAt')}}, {sort: {tweetedAt: -1}}),
        newTweets: Tweets.find({tweetedAt: {$gt: Session.get('tweetsSeenAt')}}, {sort: {tweetedAt: -1}})
      }
    },
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('profileEdit', {
    path: '/profile/edit',
    data: function() {
      if (Meteor.user()) {
        return Meteor.user().profile;
      }
    },
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('notifications', {
    path: '/notifications',
    waitOn: function() {
      return Meteor.subscribe('mentionedTweets');
    },
    data: function() {
      return {
        user: Meteor.user(),
        tweets: Tweets.find({tweetedAt: {$lte: Session.get('tweetsSeenAt')}}, {sort: {tweetedAt: -1}}),
        newTweets: Tweets.find({tweetedAt: {$gt: Session.get('tweetsSeenAt')}}, {sort: {tweetedAt: -1}})
      }
    }, 
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('profile', {
    path: '/:username',
    waitOn: function() {
      return [
        Meteor.subscribe('profile', this.params.username),
        Meteor.subscribe('profileTweets', this.params.username),
        Meteor.subscribe('myFollowers')
      ]
    },
    data: function() {
      return {
        user: Users.findOne({username: this.params.username}),
        tweets: Tweets.find({tweetedAt: {$lte: Session.get('tweetsSeenAt')}}, {sort: {tweetedAt: -1}}),
        newTweets: Tweets.find({tweetedAt: {$gt: Session.get('tweetsSeenAt')}}, {sort: {tweetedAt: -1}})
      }
    }
  });

  // this.route('villagerPage', {
  //   path: '/villagers/:_id',
  //   data: function() { return Villagers.findOne(this.params._id); }
  // });
});


// turn on the loading template before the route
Router.onBeforeAction('loading');
