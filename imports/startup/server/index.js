import './api';

Accounts.onCreateUser((options, user) => {
  const { firstName, lastName, userType } = options;
  user.firstName = firstName;
  user.lastName = lastName;
  user.userType = userType;
  return user;
});
