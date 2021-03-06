# FaunaFication Project

<p align="center">
    <a href="https://github.com/FaunaFication-737-780/Frontend-service/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/FaunaFication-737-780/Frontend-service" /></a>

   <a href="https://github.com/FaunaFication-737-780/Frontend-service/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/FaunaFication-737-780/Frontend-service" /></a>

   <a href="https://github.com/FaunaFication-737-780/Frontend-service/network/members" alt="Forks">
        <img src="https://img.shields.io/github/forks/FaunaFication-737-780/Frontend-service" /></a>

  <a href="https://github.com/FaunaFication-737-780/Frontend-service/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/FaunaFication-737-780/Frontend-service" /></a>
  
  <a href="https://github.com/FaunaFication-737-780/Frontend-service/actions/workflows/main.yml" alt="License">
        <img src= "https://github.com/FaunaFication-737-780/Frontend-service/actions/workflows/main.yml/badge.svg"/></a>
  
  <a href= "https://github.com/FaunaFication-737-780/Frontend-service/actions/workflows/unit-tests.yml" alt="License">
        <img src= "https://github.com/FaunaFication-737-780/Frontend-service/actions/workflows/unit-tests.yml/badge.svg"/></a>
  
</p>

This application is built on nodejs express and utilizes leaflet for mapping utilities, MongoDB for database and is designed to showcase cloud computing with IBM cloud.
The application serves as a biodiversity platform using interactive maps, web crawling and text sentiment analysis to enhance the users experience and provoke a call to action from the users.

# Getting started

To run the application, first set the project as your directory in the terminal then run npm ci, create a .env file based on the [.env template](https://github.com/FaunaFication-737-780/Frontend-service/blob/main/env.template) and then run npm start in the terminal.

# How to run

The application should run with no further setup required if deployed on IBM cloud. On the other hand the Docker image must have a specified port to run once downloaded e.g. 3000.

Please define the database ([mongodb](https://www.mongodb.com/)) URL and set the admin account&password. You can use a .env file for testing and in ibm cloud you can find the env variables setting in cloud foundry. For example:

```
DB_USERNAME=<database username>
DB_PASSWORD=<database password>
DB_CLUSTER=<database cluster name>
DB_NAME=<database name>
ADMIN_USERNAME=<username>
ADMIN_PASSWORD=<password>
PORT=<port>
```

Then running this server using:

```
npm install
npm start
```

# Admin Portal

The admin portal use [adminbro](https://adminbro.com/) an admin portal service built on React providing CRUD functionality by utilizing Mongoose and MongoDB. To integrate collections into the admin portal create a Mongoose Schema for that collection in the Models directory and then require it in the adminRouter.js
The test credentials are:

```
admin account = admin@example.com
password = 123456
```

Admin bro was used as it provides a very quick and simple CRUD functionality when hooked up with Mongoose and is secure by utilizing sessions. Passport was looked at initially although we had issues with other members meeting deadlines so the team needed to implement as quickly and efficiently as possible.

# Deployment

a CI/CD has been established to deploy the application to IBM Cloud whenever pushes are made to the Master Branch, to make changes to the deployment the manifest.yml can be edited to increase memory and other feature. To change factors such as the CI/CD the project owner may do so on the IBM Cloud console.
The user can also deploy changes manually if necessary by using the IBM CLI. The deployment can be found here: [Deployed service on IBM cloud](https://whydidyoubreaktoday-sleepy-eland.mybluemix.net/)

Github Actions are also being utilised to deploy a docker image of the application to dockerhub, this image can be found here: [docker hub image](https://hub.docker.com/repository/docker/bjwilkin1/ff-repo). While the Docker Image is not deployed to add in realtime support you must run it on local and run a local instance of the realtime service with the address pointing to the localhost port the docker image is running on

Utilizing IBM Clouds Kubernetes Cluster we created a cluster of the application running out of a Docker Container, The .yaml file can be found in the kubernetes folder. A link to the running kubernetes cluster can be found here: [Kubernetes deployed version](http://169.57.50.244:30598/)

## To deploy this to IBM Cloud kubernetes

- create the cluster on IBM Cloud Console
- login to the ibmcloud CLI and enter the following ibmcloud ks cluster config -c <cluster-name> (the command with the name can be found under help once the cluster has been created)
- Then apply the yaml file for this service(You can also use your own yaml file to deploy) :

```
kubectl apply -f https://raw.githubusercontent.com/FaunaFication-737-780/Frontend-service/main/kubernetes/kubernetes4github.yaml
```

- If you are using a paid cluster, you will have the external IP address generated by the IBM cloud (should take mins). Enter that ip address in you browser you can see the application running. However, if your cluster is free tire please check out the steps below.
- Use the command below to find out the NodePort for your deployment(should in range 30000):

```
kubectl describe service <The service name>
```

- From Worker node, find out the public ip address for your node.

- enter in your browser http://< Node Public IP >:<port in 30000 range>

# Testing

automated testing is implemented with mocha and chai unit tests and is mainly used to test API endpoints and the verify data passed through the microservices created for this application. Tests can be implemented by running npm test and can be located in the test folder.

# Logging

Logging is achieved via morgan and returns information such as response time for all calls made in the application, the results are logged into the applications server.log file and also within the servers console.

# Authentication/Security

To keep the admin portal secure JSON the credentials are defined in the .env file and JSON webtokens are used to verify the session so that unauthorized users cannot alter the data on the admin portal.

As the application utilizes IBM Watson Discovery an API key is essential for secure access and other credentials such as mongoDB string and admin login the credentials are within the .env environment, as well as within the PCAP local file.

# Species Data and GeoData

the mapping data and endangered species data is obtained from the IUCN redlist a non-profit organization that tracks biodiversity across the globe. Due to the limitations of both the IBM cloud lite version and MongoDB's lite tier we decided to limit the species displayed to around 20 Australian species(terrestial mammals)

Images and other materials are sourced from the internet and should fall under fair use.

Due to a lack of publicly available data and funding the data is not up to date and does not account for the latest issues in Australia such as the major bushfires in the last few years

# Services and API's

- Get Data from DB (FaaS)
  - [SpeciesInfo](https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllSpeciesInfo)
  - [Single Species Info](https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getOneSpeciesInfo?name=Agile%20Wallaby)
  - [Charities](https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllCharities)
  - [Donators](https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/donators)
- GeoJSON data provider (PaaS)
  - Feeds species [geolocation data](https://geodata-api.us-south.cf.appdomain.cloud/find/name?name=koala) and other relevant information to leaflet map in the frontend
- Live Data Service (PaaS)
  - Watches multiple databases with mongoose.Watch() and utilizes sockets in the frontend to provide [realtime data support](https://realtime-db-service.us-south.cf.appdomain.cloud/)
- Stripe API (API)
  - Provides the ability to donate to the websites strip wallet, setup recurring donations etc.
- Text 2 Speech (API)
  - Utilizes google text 2 speech API to provide text 2 speech functionality
- Live Tweet Observer (PaaS)
  - Utilizes the twitter API to feed real time tweets related to the topic of biodiversity in Australia into the frontend
- IBM Watson Discovery News Web Crawler Service (PaaS)
  - provides queries related to the species and/or charities in the frontend to retrieve the latest news and topics providing sentiment analysis
- DBaaS, we use mongoDB Atlas to provide the Database as a service
  - The DB can be accessed and edited through the admin portal or through MongoDB Compass using a URI in the following format
  ```
  mongodb+srv://admin:password@cluster0.5cdt0.mongodb.net/test?authSource=admin&replicaSet=atlas-yeq6k6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
  ```
  - We used MongoDB as it plugs right into Admin Bro, the group was more familiar with it and realtime support can be done pretty easily using Mongoose, we did explore cloudAnt and Firebase Realtime DB as alternatives

# References

[materializecss](https://materializecss.com/)

[IBM Cloud](https://www.ibm.com/cloud)

[adminbro](https://adminbro.com/)

[mongodb](https://www.mongodb.com/)

[morgan](https://github.com/expressjs/morgan)

[IUCN Red List of Threatened Species](https://www.iucnredlist.org/)

[Docker Hub](https://hub.docker.com/)

# License

Licensed under [Apache License 2.0](https://github.com/FaunaFication-737-780/Frontend-service/blob/main/LICENSE)

# Contribution

See [contributors page](https://github.com/FaunaFication-737-780/Frontend-service/graphs/contributors)

# Architectural Diagram

The diagram is [here](./architectural-diagram.jpg)
