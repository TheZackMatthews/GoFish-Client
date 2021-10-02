# GoFish
## About
GoFish is a data collection app for Android and IOS designed for Skagit Fisheries Enhancement Group’s field worker volunteers. Through the application’s menu you can view your location on a map and submit reports of live, dead, or nests of salmon.
- If you don’t know the species of a salmon you find, you may enter a dichotomous key which acts as a flowchart to help your identification process.
- Menus are designed for new users, and have the option to display larger text for accessibility
## Setup
Fork each of the following repos and create a `.env` file in the root directory of each app except for GoFish-Supervisor
Deploy your backend to Amazon AWS and Heroku (Both have a free tier of use, which this app should not exceed)
Make an Expo account to run the app over either an emulator or smart phone, where you can start submitting surveys. These reports can be exported to .csv using the GoFish-Supervisor app.
https://github.com/TheZackMatthews/GoFish-Client
https://github.com/TheZackMatthews/GoFish-API
https://github.com/TheZackMatthews/GoFish-Supervisor

> GoFish-API

    PORT = 3001
    HOST = localhost
    DBCONNECTIONURL = <amazon AWS server address>
    DBCONNECTPORT: 5432
    DBNAME = postgres
    DBUSER = postgres
    DBPASSWORD = <password>
> GoFish-Client

    FB_apiKey=<Firebase Key>
    FB_authDomain=<Firebase Domain>
    FB_projectId=<Firebase ProjectID>
    FB_storageBucket=<Firebase Database URL>
    FB_messagingSenderId=<Firebase ID>
    FB_appId=<Firebase Client ID>
    API=<URL of GoFish-API>

## Technology Used
##### GoFish Client
- React Native
- React Native Paper
- Firebase
- Expo
##### GoFish Rest API
- Postgresql
- Sequelize
- Express.js
##### GoFish Supervisor
- React
- Next.js
- Firebase
## Credits
Created as a thesis project for Codeworks Remote EST 2021
- Antti Mölsä
    https://github.com/anttim1
- Zack Matthews
    https://github.com/TheZackMatthews
- Kimberly Innes
    https://github.com/kjinnes
- Saban Yavasca
   https://github.com/sabyav84
