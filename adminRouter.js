const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

//use user now for example
//const User = require('./models/userModel')
require('./models/speciesInfoModel')
require('./models/donatedPeopleModel')
require('./models/charitiesModel')
const mongoose = require('mongoose')
const favicon = require('./models/logos')

require('dotenv').config();

AdminBro.registerAdapter(AdminBroMongoose)


const AdminBroOptions = {
    //resources: [cat],
    preventAssignment: true,
    databases: [mongoose],
    dashboard: {
        handler: async () => {
            return {
                some: 'output'
            }
        },
        component: AdminBro.bundle('./models/dashboard/dashboard.jsx')
    },
    branding: {
        companyName: 'Animals in Australia admin portal',
        logo: 'https://cdn-bodde.nitrocdn.com/PgnkCIsGyOJiNkMdDOHEAiCvMEeINUsu/assets/static/source/rev-93acb20/wp-content/uploads/2011/06/Best-animals-in-Australia.jpg',
        favicon: favicon
        
        
      }

}

const ADMIN = {
    email: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "admin",
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || "12345678",
    authenticate: async (email, password) => {
        if (email == ADMIN.email && password == ADMIN.password) {
            return ADMIN
        }
        return null
    }
})


module.exports = router