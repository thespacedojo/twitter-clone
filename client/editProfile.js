Template.editProfile.helpers({
});

Template.editProfile.events({
  'change .file-field': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Avatars.insert(files[i], function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        Users.update(Meteor.userId(), {$set: {"profile.avatarFile": fileObj}})
      });
    }
  },
  "submit form": function(event, template) {
    event.preventDefault();
    data = SimpleForm.processForm(event.target);
    Users.update(Meteor.userId(), {$set: {profile: data}}, function(err) {
      if (err)
        CoffeeAlerts.warning("There was an error saving your profile.");
      else
        CoffeeAlerts.success("Your profile has been updated");
        Router.go('/');
    })
  }
})
