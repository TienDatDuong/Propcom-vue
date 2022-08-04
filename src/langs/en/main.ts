import common from './common';
import layoutAdmin from './layouts/layout-admin';
import loginView from './views/auth/login';

export default {
  'app_title': 'Sample',
  'common': common,
  'layouts': {
    'layout-admin': layoutAdmin,
  },
  'views': {
    'auth': {
      'login': loginView
    }
  },
  'messages': {
    'auth': {
      'logout': 'You have successfully logged out!'
    }
  }
};
