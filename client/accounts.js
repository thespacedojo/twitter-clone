Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: '/profile/edit',
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignUpFields: [{
      field: 'name',
      label: 'Full Name',
      type: 'text',
      required: true 
    }]
  })
})
