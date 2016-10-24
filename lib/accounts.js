///
// Lib - Accounts
///

var form_submission_handler = function(error, state){
  if (!error) {
    if (state === "signIn") {
      console.log("Successfully signed in");
    }
    if (state === "signUp") {
      console.log("Successfully registered");
    }
  }
};

AccountsTemplates.configure({  
  // defaultLayout: 'emptyLayout',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});
