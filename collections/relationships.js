Relationships = new Mongo.Collection('relationships');

// Relationships.before.insert(function (userId, doc) {
//   doc.followedAt = Date.now();
// });

Meteor.methods({
  'relationships/create': function(followingId) {
    if (Meteor.isServer) {
      Meteor.users.update({_id: this.userId}, { $push: {followingIds: followingId}});
    }
  },

  'relationships/destroy': function(followingId) {
    if (Meteor.isServer) {
      Meteor.users.update({_id: this.userId}, { $pull: {followingIds: followingId}});
    }
  },
})
