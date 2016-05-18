#FeelTrip
**Developers**: Anna Concepion, Kasia Bartos DelPercio, Matthew Jelling

**Get your feels [here](http://feeltrip.herokuapp.com/).**

FeelTrip is a real time content aggregator that enables users to stay connected to places beyond where they currently live. Unlike SnapChat, Twitter, Facebook, FeelTrip immerses users in the current mood of a given place, helping them either discover something new or reminisce in the now.


###Technical Overview & Approach

This application was built by 3 GA WDI students (in cooperation with Product Management Intensive students - and superstars - Julie Polizzotto, Judd Grutman, & Matthew Gibson) on a Node.js / Express / MongoDB stack + Semantic UI Front-end framework. For authentication, a JWT/Passport.js strategy is used, in addition to OAuth 1.0. The third party APIs we elected to use for this project were: Twitter, OpenWeather and Spotify. 


###User Stories

- As a user, I want to be able to easily see all of the locations in one place so that I can make an informed decision about where I want to explore.

- As a user, I want to be able to view one location at a time so that I can feel immersed in the place (detailed view).

- As a user, I want to be able to view 5 - 15 trending topics on Twitter in a given place so that i can have an idea of what people care about in that moment in time without being too overwhelmed

- As a user, I want to be able to view the current weather of a given place so that i can envision myself there at that moment.

- As a user, I want to be able to return to the main view when I am on a location’s page so that i can immerse myself in other locations with minimal effort.

- As a user, I want to be able to easily log into FeelTrip so I can access FeelTrip
  - the landing page has a clear call to action for log in
  - the log in calls for an email and password
  - a password reset option is available
  - log out is easily accessible in the top right corner from all pages

- As a user, I want to be able to save a snapshot of all of the information on location page so that I can look back on it later.

- As a user, I want a universal menu to be able to access from any page that can direct me where I want to go next.


###Wireframes & Screenshots

- Wireframe:
![wireframe](client/public/images/feeltrip-wireframe1.png)

- Login Page: 
![Login page](client/public/images/feeltrip-screen1.png)

- Main Page: 
![Main page - gateway to city pages](client/public/images/feeltrip-screen2.png)

- Main Page: active link with hover effect: 
![Main page - active link](client/public/images/feeltrip-screen3.png)

- City Page:
![City page](client/public/images/feeltrip-screen4.png)

- Menu buttons: 
![Menu buttons](client/public/images/feeltrip-screen5.png)
