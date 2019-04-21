const index = "https://eye-reporter.herokuapp.com";

const profileImageUploadURL = `${index}/api/v1/users/profile-image`;
const signupURL = `${index}/api/v1/auth/signup`;
const loginURL = `${index}/api/v1/auth/login`;
const redflagURL = `${index}/api/v1/red-flags`;
const interventionURL = `${index}/api/v1/interventions`;
const securePagesURL = `${index}/api/v1/auth/secure-pages`;
const personalInterventionURL = `${index}/api/v1/profile/interventions`;
const personalRedflagURL = `${index}/api/v1/profile/red-flags`;

export {
  index,
  profileImageUploadURL,
  signupURL,
  loginURL,
  redflagURL,
  interventionURL,
  securePagesURL,
  personalInterventionURL,
  personalRedflagURL
};
