Relationships = new Mongo.Collection('relationships');

Relationships.before.insert(function (userId, doc) {
  doc.followedAt = Date.now();
  doc.followerId = userId;
});
