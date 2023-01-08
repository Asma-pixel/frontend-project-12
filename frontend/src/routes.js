const apiPath = '/api/v1';

const getApiPath = (path) => [apiPath, path].join('/');
export default {
  loginPath: () => getApiPath('login'),
  dataPath: () => getApiPath('data'),
  signUpPath: () => getApiPath('signup'),
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  signUpPagePath: () => '/signup',
  noMatchPagePath: () => '*',
};
