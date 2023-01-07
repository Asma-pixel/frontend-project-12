export default {
  translation: {
    navBar: {
      title: 'Hexlet Chat',
      logoutBtn: 'Log out',
    },
    notFoundPage: {
      text: 404,
    },
    generalErrors: {
      network: 'Network error',
    },
    loginPage: {
      title: 'Log in',
      btn: 'Log in',
      signupTitle: 'Don\'t have an account?',
      signupLink: 'Registration',
      usernameLabel: 'Your nickname',
      passwordLabel: 'Password',
      errors: {
        userNotFound: 'Invalid username or password',
      },
    },
    signupPage: {
      title: 'Registration',
      btn: 'Sign up',
      usernameLabel: 'Username',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm password',
      errors: {
        emptyField: 'Required field',
        incorrectLengthUsername: '3 to 20 characters',
        toShortPassword: 'At least 6 characters',
        passwordsNotEqual: 'Passwords do not match',
        userExists: 'This user already exists',
      },
    },
    chat: {
      channelsTitle: 'Channels',
      addChannelSpan: '+',
      removeChannel: 'Remove',
      renameChannel: 'Rename',
      sendMessagePlaceholder: 'Enter your message...',
      sendMessageBtn: 'Send',
      countMessages_one: '{{count}} message',
      countMessages_other: '{{count}} messages',
    },
    modals: {
      addChannel: {
        title: 'Add channel',
        canselBtn: 'Cansel',
        addBtn: 'Submit',
      },
      renameChannel: {
        title: 'Rename channel',
        canselBtn: 'Cansel',
        renameBtn: 'Submit',
      },
      removeChannel: {
        title: 'Remove channel',
        body: 'Are you sure?',
        canselBtn: 'Cansel',
        deleteBtn: 'Remove',
      },
      errors: {
        emptyField: 'Required field',
        incorrectFieldLenth: '3 to 20 characters',
        notUniqueField: 'Must be unique',
      },
    },
    toast: {
      addChannelSuccess: 'Channel created',
      deleteChannelSuccess: 'Channel deleted',
      renameChannelSuccess: 'Channel renamed',
    },
  },
};
