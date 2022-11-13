# Sayyara

The deployed app can be accessed here: https://sayyara-client.herokuapp.com/

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
    * Sayyara aims to connect vehicle owners with automobile shops and the services they provide. By providing vehicle owners with a greater selection of automobile shops to choose from, they can better find services, prices, and conditions suited to their needs. In turn, automobile shops will gain better visibility and attract a larger audience through Sayyara, boosting their sales and profits. Sayyara allows for greater organization and clear communication between vehicle owners and automobile shops, leading to greater efficiency and better satisfied clients and businesses.
 * What is the problem you're trying to solve?
    * The problem we are trying to solve is the lack of such a product in the current world. Vehicle owners need to crawl through dozens of websites, emails, text messages, and phone numbers to communicate with shop owners, as well as list down services, prices, and details by themselves before deciding on a shop to choose. This is inefficient, frustrating, and draining for both vehicle owners and automobile shops alike. 
 * Is there any context required to understand **why** the application solves this problem?
    * The application directly solves this problem by streamlining the process in which vehicle owners can contact, connect to, and communicate with automobile shops.  

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built
 * There are multiple models representing core pieces of the application that users can interact with, all with built in CRUD functionality and more. We have models for Users, Shops, Services, Ratings, Vehicles, and ShopAdmins that act as the core foundation of our application. 
   * General: 
      * User signin/ signup: A user can register and create an new account within our system. Furthermore, they can also login and be authenticated for a session which would allow them to access more feature within the application. There are two main types of user, general users and shop owners.  General users are vehicles owners who go on to Sayyara looking for autoshops. Shop owners are managers of one or more shops who can login to edit their shops’ information (services list, open hours, …).
      * Landing page - shop search dashboard: One place where you can see it all. The landing page allows those using Sayyara app to view, search for, and sort through shops in order to find the auto repair shop which best suits their needs. The landing page also provides access to signin or signup, a navigation bar with menu options to access all other webpages of Sayyara.
      * Search for shops: Users can search for an automotive repair shop based on its name using the search bar in the landing page
      * Sort shops for view: Users can filer through or organize the list of existing repair shops based on criteria such as average price range for service, or proximity of store, stores ratings
   * Vehicle owner:
      * User profile: Vehicle owners can keep track of and update their information, both pertaining to themselves and their vehicles. These features become especially important when quote features will be released and users will want to communicate their information for repairs
   * Shop owner:
      * User profile: The user profile for a shop owner, in addition to containing basic information about the user, is tied to the shop managed for that user (see shop profile and shop management to understand more)
      * Shop profile: This is a page representing the shop to users on the app so that they can learn more about the shop, and hopefully proceed into business with it. The shop owner can specify hours of operation, services offered, or other features, which are simplified into the shop tile on the landing page
      * Shop management: This feature enables the shop owner to update the information stored in the app about the store. This information can either be customer facing (e.g. change the hours of operation for a store) or internal (e.g. allow another user to manage shop details)

## Instructions
 * Parts of our application can be accessed without creating an account. Searching for shops and viewing detailed information about each shop can be done by anyone without an account. 
   * The landing page is a page where users can see all the available shops display on the screen alongside the option to search for shops using the search bar at the top of the page.
   * Clicking on each of the shops will take the user to a shop profile, where they are able to view more details about the shop they selected. In detail, they will be directed to a shop information page where the average rating, price range, open hours as well as offered services list for a given shop are displayed
   * One of the key feature is that the user can also easily search for a specific automobile shop by its name using the search bar. Moreover, it is also possible to sort all displayed shops based on their average price or average rating.
 * Other parts of the application are only accessible to registered users. Setting user profile information, creating vehicles under the user profile, or in the case of a shop owner, creating and managing shops can only be done by registered users.
   *  To register as a user, either navigate to the /signup route or click the log-in button at the top right of the landing page and navigate to the sign-up page from there. Fill out the necessary information on the form and click the bottom button to create a user. To create an account for a shop owner, make sure to check the checkbox at the bottom of the form to indicate that the account will belong to a shop owner. This will take the user to the log-in page where they can use the account they just created to log-in to the application.
   * From there, users can navigate to their profile page by clicking the user icon on the top right of the landing page. 
   * All types of users will have the basic information fields, where they are able to edit their name, phone number, and email. Users must save the changes after updating the information.
   * For Vehicle, the user can fill in a few essential information for their vehicle that get stored in the user's profile such as license plate, model, VIN, mileage and type of the vehicle. This can be easily access in the profile page of each user when logged in.
   * For shop owners, they would have access to the shop management page where they can edit the basic information for a given shop such as open hours, services list or shop's managers. This is accessible in the shop management page which would be made visible for users who are also shop owners

 ## Development requirements

## Local

- **Preliminary setup**
  
  - Install [Node.js](https://nodejs.org/en/)
  - If you do not have a remote MySQL server, install [MySQL 8.0](https://dev.mysql.com/downloads/) and setup a local server instance
  
- **Dependency installation**

  - At the root level, run `npm install:all` to install the dependencies used in the project
  
- **Database setup**

  - Go to the the config file located at `./server/app/config/config.json`

  - Under `development` fill out the connections details to your MySQL database

    - Local database might look something like this

      ```json
      "development": {
          "username": "root",
          "password": "abc123",
          "database": "sayyara",
          "host": "127.0.0.1",
          "dialect": "mysql"
        }
      ```

    - Remote database might look something like this

      ```json
      "development": {
          "username": "admin",
          "password": "abc123",
          "database": "sayyara",
          "port": 12345,
          "host": "sayyara-database.dbhost.com",
          "dialect": "mysql",
          "dialectOptions": {
            "ssl": {
              "require": true,
              "rejectUnauthorized": false
            }
          }
        }
      ```

  - Then `cd ./server/app` and run the following command in a terminal: `sequelize db:migrate`

    - This will setup all the tables in your database

- **Running server**

  - At the root level, run `npm run start:server`

- **Running client**

  - At the root level, run `npm run start:client`
  - If the server is not hosted on localhost, go to `./client/src/services/config/config.json` and update `API_URL` accordingly
  
- **Running tests**

  - At the root level, run `npm run tests:all` to run all the tests


 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
    * Back-end and front-end set up two branches for their respective portion of the application. When implementing features, developers branched off these two initial branches and did pull-requests to merge their branches back onto the back-end and front-end branches. We then created a production branch called prod, and a development branch called dev, and merged the back-end and front-end branch into these branches. While integrating back-end and front-end, we branched from dev and merged dev into prod when features/integrations were finished. At all times, 3 other developers are needed to review and approve of a pull request before it can be merged, at which point any developer can merge the pull-request.
 * If applicable, specify any naming conventions or standards you decide to adopt.
    * We have very basic naming conventions, as we called the branch where we called our main branches back-end, front-end, prod, and dev, which is conventional in the industry.
 * Describe your overall deployment process from writing code to viewing a live application
    * While the back-end was creating APIs for the front-end to call, the front-end used mock-data simulating the models and returned data from the APIs to develop the UI of the application. Back-end first created models and migrations for the application, and then wrote CRUD APIs for each model, testing them locally with Postman, the API platform. The back-end continued to create more specific APIs that front-end would use, and once finished front-end began integration of the APIs in batches to create a connected application, testing locally. Once the backend and frontend changes have been integrated and tested, it will be merged onto main. At this point, the group member responsible for deployment will deploy the main branch on our hosting service.
 * What deployment tool(s) are you using and how
    * We currently manually deploy the main branch onto Heroku. During the deployment process, we use the Heroku CLI to monitor any errors that appear. In the future, we plan on automating it as part of GitHub actions, but due to how our repo is set up, it may require a restructuring of our project, or complex scripts to accomplish.
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!
    * We chose this workflow to give teams autonomy, independence, and value while working. It felt more efficient to have the front-end work on UI with mock data while the back-end was creating the models, migrations, and APIs so that every member could be of use at the same time. We then needed to integrate, bug-fix, and write up this report together once the back-end was finished with the APIs. 

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
   * We agreed with our partner to apply an open source license on the project, as our partner aims to build off of our work in the future as he continues working with the product. 
 * What affect does it have on the development and use of your codebase?
   * Applying an open source license on our project has kept us aware that our partner and perhaps other parties in the future may want to build off of our code, which has only affected our development by driving the team to keep the code base organized.
 * Why did you or your partner make this choice?
   * Our partner and I made this choice because our team wanted to be recognized for the work we have done on the application while our partner can also freely use the code to build a more finalized product in the future.
