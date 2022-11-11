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

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
  * Back-end and front-end set up two branches for their respective portion of the application. When implementing features, developers branched off these two initial branches and did pull-requests to merge their branches back onto the back-end and front-end branches. We then created a production branch called prod, and a development branch called dev, and merged the back-end and front-end branch into these branches. While integrating back-end and front-end, we branched from dev and merged dev into prod when features/integrations were finished. At all times, 3 other developers are needed to review and approve of a pull request before it can be merged, at which point any developer can merge the pull-request.
 * If applicable, specify any naming conventions or standards you decide to adopt.
    * We have very basic naming conventions, as we called the branch where we called our main branches back-end, front-end, prod, and dev, which is conventional in the industry.
 * Describe your overall deployment process from writing code to viewing a live application
    * While the back-end was creating APIs for the front-end to call, the front-end used mock-data simulating the models and returned data from the APIs to develop the UI of the application. Back-end first created models and migrations for the application, and then wrote CRUD APIs for each model, testing them locally with Postman, the API platform. The back-end continued to create more specific APIs that front-end would use, and once finished front-end began integration of the APIs in batches to create a connected application, testing locally.
 * What deployment tool(s) are you using and how
    * NEEDS TO BE FILLED OUT
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!
    * We chose this workflow to give teams autonomy, independence, and value while working. It felt more efficient to have the front-end work on UI with mock data while the back-end was creating the models, migrations, and APIs so that every member could be of use at the same time. We then needed to integrate, bug-fix, and write up this report together once the back-end was finished with the APIs. 

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?