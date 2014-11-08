Template.profileEdit.helpers({
  forProfilePic: function() {
    return {
      name: "profilePic",
      multiple: true,
      onSelection: function(fileList) {
        console.log(fileList)
      },
      onUpload: function(error, result) {
        if (result) {
          console.log(result)
          Session.set("profilePicUrl", result)
        }
      }
    }
  }
});

Template.profileEdit.events({
  "submit form": function(event, template) {
    event.preventDefault();
    data = SimpleForm.processForm(event.target);
    Users.update(Meteor.userId(), {$set: {profile: data}}, function(err){
      if (err)
        CoffeeAlerts.warning("There was an error saving your profile.");
      else
        CoffeeAlerts.success("Your profile has been updated.");
        Router.go("/");
    });
  }
});
