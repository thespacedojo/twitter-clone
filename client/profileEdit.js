Template.profileEdit.events({
  'submit form': function(event, template) {
    event.preventDefault();
    data = SimpleForm.processForm(event.target);
    combinedData = _.extend(Meteor.user().profile, data);
    Meteor.users.update({_id: Meteor.userId()},{$set: {profile: combinedData}})
  }
})
