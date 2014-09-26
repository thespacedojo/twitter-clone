Relationships = new Mongo.Collection('relationships');

// Relationships.before.insert(function (userId, doc) {
//   doc.followedAt = Date.now();
// });

Meteor.methods({
  'relationships/create': function(followingId) {
    if (Meteor.isServer) {
      relation = Relationships.insert({followingId: followingId, followerId: Meteor.userId()});
      return relation ? true : false
    }
  },

  'relationships/destroy': function(followingId) {
    if (Meteor.isServer) {
      Relationships.remove({followingId: followingId, followerId: Meteor.userId()})
    }
  },
})
