# FaunaFication Project
This application is built on nodejs express and utilizes leaflet for mapping utilities, MongoDB for database and is designed to  showcase cloud computing with IBM cloud.
The application serves as a biodiversity platform using interactive maps, web crawling and text sentiment analysis to enhance the users experience and provoke a call to action from the users.


# Getting started
To run the application, first set the project as your directory in the terminal then run npm ci and then npm start, as no .env file yet


#Admin Portal
The admin portal use adminbro an admin portal service built on react providing CRUD functionality by utilizing Mongoose and MongoDB. To integrate collections into the admin portal create a Mongoose Schema for that collection in the Models directory and then require it in the adminRouter.js

#Deployment
a CI/CD has been established to deploy the application to IBM Cloud whenever pushes are made to the Master Branch.
Github Actions are also being utilised to deploy a docker image of the application to dockerhub. We hope to build on this and deploy the dockerized application to a kubernetes cluster.

#Testing
automated testing is implemented with mocha and chai unit tests and is mainly used to test API endpoints and the verify data passed through the microservices created for this application. Tests can be implemented by running npm test and can be located in the test folder.

#Logging
Logging is achieved via morgan and returns information such as response time for all calls made in the application, the results are logged into the applications server.log file

#Authentication/Security
To keep the admin portal secure JSON the credentials are defined in the .env file and JSON webtokens are used to verify the session so that unauthorized users cannot alter the data on the admin portal.

As the application utilizes IBM Watson Discovery an API key is essential for secure access and is thus hidden within a PaaS that provides requested data.


#Species Data and GeoData
the mapping data and endangered species data is obtained from the IUCN redlist a non-profit organization that tracks biodiversity across the globe. Due to the limitations of both the IBM cloud lite version and MongoDB's lite tier we decided to limit the species displayed to around 50 endangered Australian species(terrestial mammals)

Images and other materials are sourced from the internet and should fall under fair use.

#Services and API's

* Get Data from DB (FaaS)
  * SpeciesInfo
  * Charities
  * Donators
* GeoJSON data provider (PaaS)
  * Feeds species geolocation data and other relevant information to leaflet map in the frontend
* Live Data Service (PaaS)
  * Watches multiple databases with mongoose.Watch() and utilizes sockets in the frontend to provide realtime data support
* Stripe API    (API)
  * Provides the ability to donate to the websites strip wallet, setup recurring donations etc.
* Text 2 Speech (API)
  * Utilizes google text 2 speech API to provide text 2 speech functionality
* Live Tweet Observer (PaaS)
  * Utilizes the twitter API to feed real time tweets related to the topic of biodiversity in Australia into the frontend
* IBM Watson Discovery News Web Crawler Service (PaaS)
    * provides queries related to the species and/or charities in the frontend to retrieve the latest news and topics providing sentiment analysis

