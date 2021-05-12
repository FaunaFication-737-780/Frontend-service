# FaunaFication Project
This application is built on nodejs express and utilizes leaflet for mapping utilities, MongoDB for database and is designed to  showcase cloud computing with IBM cloud.
The application serves as a biodiversity platform using interactive maps, web crawling and text sentiment analysis to enhance the users experience and provoke a call to action from the users.


# Getting started
To run the application, first set the project as your directory in the terminal then run npm start, as no .env file yet


#Deployment
a CI/CD has been established to deploy the application to IBM Cloud whenever pushes are made to the Master Branch.
Github Actions are also being utilised to deploy a docker image of the application to dockerhub. We hope to build on this and deploy the dockerized application to a kubernetes cluster.

#Testing
automated testing is implemented with mocha and chai unit tests and is mainly used to test API endpoints and the verify data passed through the microservices created for this application. Tests can be implemented by running npm test and can be located in the test folder.

#Logging
Logging is achieved via morgan and returns information such as response time for all calls made in the application

#Authentication
To keep the admin portal secure we will utilize passport and JSON web tokens in tandem with mongoose, to ensure that the admin portal can only be accessed by the site owner

#Species Data and GeoData
the mapping data and endangered species data is obtained from the IUCN redlist a non-profit organization that tracks biodiversity across the globe. Due to the limitations of both the IBM cloud lite version and MongoDB's lite tier we decided to limit the species displayed to around 50 endangered Australian species(terrestial mammals)

#Services and API's
* FaaS 1: url
* Faas 2: url
* External API 1: url
* IBM watson discovery endpoint: url
* Stripe