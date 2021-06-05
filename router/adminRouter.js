const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

//use user now for example
//const User = require('./models/userModel')
const speciesInfo = require('../models/speciesInfoModel');
const donatedPeople = require('../models/donatedPeopleModel');
const charities = require('../models/charitiesModel');
const mongoose = require('mongoose');
const favicon = require('../models/logos');
const databaseParent = {
  name: 'Data',
  icon: 'Document',
};
require('dotenv').config();

AdminBro.registerAdapter(AdminBroMongoose);

const locale = {
  translations: {
    labels: {
      // change Heading for Login
      loginWelcome: 'FaunaFication Admin Portal',
    },
    messages: {
      loginWelcome:
        'Please use admin example and password to login. To gain access please contact our team. ',
    },
  },
};
const AdminBroOptions = {
  resources: [
    { resource: speciesInfo, options: { navigation: databaseParent } },
    { resource: donatedPeople, options: { navigation: databaseParent } },
    { resource: charities, options: { navigation: databaseParent } },
  ],
  preventAssignment: true,
  // databases: [mongoose],
  dashboard: {
    handler: async () => {
      return {
        some: 'output',
      };
    },
    component: AdminBro.bundle('../models/dashboard/dashboard.jsx'),
  },
  branding: {
    companyName: 'FaunaFication',
    logo: 'https://i.imgur.com/JYdXDWa.png',
    favicon: favicon,
    softwareBrothers: false,
  },
  locale,
};

const ADMIN = {
  email: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || '12345678',
  authenticate: async (email, password) => {
    if (email == ADMIN.email && password == ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = router;
