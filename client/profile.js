Template.profile.helpers({
  joined: function() {
    return moment(this.user.createdAt).format("MMMM Do, YYYY")
  },
  following: function() {
    return Relationships.findOne({followerId: Meteor.userId(), followingId: this._id})
  }
})

Template.profile.events({
  'click .follow-me': function(event, template) {
    Meteor.call('relationships/create', template.data.user._id)
  },
  'click .unfollow-me': function(event, template) {
    Meteor.call('relationships/destroy', template.data.user._id)
  }
})
