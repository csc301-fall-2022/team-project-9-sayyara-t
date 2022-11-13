# Sayyara

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
   * User: User has CRUD functionality. A user can register and create a new User, delete their own User, edit their User information, and retrieve their own User information. Furthermore, Users can also login and be authenticated for a session. User's that register as a vehicle owner will have a role_id of 2 in their User model, while shop owners that register will have a role_id of 3 in their User model. A role_id of 1 in a User model is to represent an admin, which has authentication for everything in the application.
   * Shop: Shop has CRUD functionality. A Shop Owner (User model with a role_id of 3) that is logged in and with the correct role_id is allowed to create, edit, and delete shops that they are administrators of. Every shop will have a profile page, displaying all the information stored in respective Shop model relevant to vehicle owners, the services the shop provides, and the ratings the shop have been given. We store all data concern shop administration in the ShopAdmin model, which has two foreign keys to user_id and shop_id. If a user_id is matched to a shop_id in ShopAdmin, then that User is allowed to edit the Shop model, all the Services model that Shop model is linked to, and assign other User models to be administrators of that Shop. <br> <br/>
   Furthermore, it is publically available to view all Shops through a GET request, meaning that vehicle owners (User model with a role_id of 2) can view all the shops on the landing page for vehicle owners. Furthermore, our GET request is customized to take in a search key and a sort key, meaning users can search for Shop models by their name, and also sort them by their average price and star ratings. Average price and star ratings for each Shop model is calculated through the Ratings model, where each data point contains a price and star rating left by a User model for a specific Shop model. 
   * Services: Services have CRUD functionality. User models that are administrators of a Shop Model can create Service models for shops. Furthermore, they are allowed to edit and delete these models as they see fit. The homepage for a shop will be able to make an API call to get all the Service models that have the Shop model's ID as a foreign key.
   * Ratings: Ratings have CRUD functionality. A vehicle owner (User model with a role_id of 2) can create, edit, and delete a Rating model for a Shop model. Users will be able to leave a price (integer from 1-4) and star value (integer from 1-5) to indicate their opinion of the shop. These Rating models will be used to sort the Shop models in the Shop models GET request by averaging a Shop model's price and star ratings, as stated beforehand.
   * Vehicles: Vehicles have CRUD functionality. A vehicle owner (User model with a role_id of 2) can create, edit, and delete a Vehicle model to represent the vehicle they need to be attended. A user can view all the vehicles they have created on the application as the Vehicle model has a foreign key to a User model.
   * ShopAdmin: ShopAdmins have CRUD functionality. When a shop owner (User model with a role_id of 3) creates a new shop/Shop model, a new ShopAdmin model is automatically created with user_id set to the User model's id and a shop_id set to the new Shop model's id. Furthermore, every shop admin of a shop can assign other shop owners to be a shop admin of said shop, creating a new ShopAdmin model, and also remove a shop owner from being a shop admin of said shop, deleting a ShopAdmin model.

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully

 ## Development requirements

 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

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
