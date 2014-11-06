Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/',
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignUpFields: [{
      field: 'name',
      label: 'Full Name',
      type: 'text',
      required: true 
    }]
  })
})
