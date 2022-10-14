# Sayyara

## Product Details
 
#### Q1: What are you planning to build?

We are building an application for vehicle owners to find and communicate with auto shop owners in order to send in service requests and receive price estimates. We believe that enabling and structuring these interactions will allow vehicle owners to get the services they need from a professional that is a good fit, thereby giving the registered shops an opportunity to grow their customer base.

Our application will be a web application accessible through both desktop and mobile to both auto shops and vehicle owner accounts. With proper forms, searching, and methods of communication, vehicle owners can reach out to mechanics to get proper estimates on the repair jobs they need. Sayyara’s market research demonstrates that with communication of this sort, vehicle owners will be more likely to engage with new mechanics, and thus mechanics can get more customers.

The different features of our application work together in order to tackle the selected problem: the searching mechanism allows vehicle owners to find mechanics, the service request form allows vehicle owners to articulate their issue and needs with the help of provided tools to get estimates from mechanics, and a chat feature allows all parties to communicate with each other. A little more on how each of the features work:

_Service request form_: the user selects an issue they are looking to fix from a drop down menu (which includes ‘unsure’), can add an attachment such as a picture of a car part or a recording of a sound the vehicle is making, and select one or many mechanics to send the form to for a price estimate.

_Search function_: In order to select which mechanic to send the form to, a vehicle owner can search for mechanics to connect with by name, location, or services offered.

_Chat_: In order to understand a service form better, or even try and establish a repair relationship of any sort, the user or mechanic can choose to chat.

It is important to note: many of the features articulated in our product would be of better use to the shop owner in the event where the owner had better tools for appointment making or order management. We are quite aware of this issue, and it is not a coincidence. Please check the highlights section to understand why these features are not a part of our application.



#### Q2: Who are your target users?

We have 2 sets/classes of target users: (1) Independent auto repair shop owners, (2) Vehicle owners in need of auto repair.
Here are some insights into both of these parties (the chosen criteria we chose to elaborate on are thanks to the personna template recommended by the instructor, and found here https://library.xtensio.com/user-persona-template-and-examples).

**Independent Auto Shop Owners**:
 - Goals
   - Wish to have a steady and full client base
   - Want to maintain current client base
   - Want ways to find new clients
   - Want a streamlined process for intaking jobs
 - Frustrations
   - It is hard to dedicate time to trying to attract customers when maintaining a shop takes so much time and effort
   - Vehicle owners are not so inclined to try out new mechanics and have a hard time trusting them
   - It is hard to get word out about a small business in order to maintain a stream of incoming clients

**Vehicle Owners in Search of Repair**:
 - Goals
   - Get repair done in efficient manner with a mechanic who:
   - Understand the issue and can communicate well about it
   - Offers a reasonable timeline
   - Offers a reasonable price
   - Seems trustworthy
   - Gets the job done with minimal administrative ‘headache’
   - Establish relationships with mechanics who meet all of the above qualifications for easy future repair
   - Find local mechanics who meet the above qualifications (in situations where the vehicle owner is not in their usual locale)
 - Frustrations
   - Hassle of communication to get a mechanic to understand and diagnose an issue with the vehicle
   - Mechanics can overcharge
   - Mechanics are not always available when you need them to be


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

We will address how our application will meet the needs of our target users from the perspectives of the two users: (1) vehicle owners, (2) auto shop owners.

**Vehicle Owners:**
 - Vehicle owners are looking for an efficient and helpful repair experience. We believe that efficient and helpful repair comes as the result of a number of qualifications, which our application allows the user to easily search for and compare in as many auto shops as they wish, in order to get their desired result. We will not outline some of these qualifications and explain how our application aids the user in efficiently searching for them:
   - Understands the issue and can communicate well about it:
     - The application comes with a chat feature to allow for direct communication about a given service request to help make sure that the vehicle owner and auto repair professional are on the same page about the issue.
     - The service request form allows the vehicle owner detail their issue in many ways, including sending attachments to help explain their issue, in order to allow the mechanic to get a better understanding of the issue at hand
   - Offers a reasonable timeline:
     - The user can request a specific timeline in which they want their car serviced
     - The user can compare the time estimates provided by all the mechanics they send quotes to in order to choose the option that works best for them
   - Offers a reasonable price:
     - The user can compare the price estimates provided by all the mechanics they send quotes to in order to choose the option that works best for them
   - Seems trustworthy:
     - The user gets to have personal interactions with the mechanic via the chat before choosing to work with them, which gives them an increased opportunity to form opinion about the repair professional’s trustworthiness, and hopefully increase trust
   - Gets the job done with minimal administrative ‘headache’:
     - The application lightens the administrative work surrounding the repair process as the work request is streamlined, and the invoices are conveniently linked to completed service requests
     - The ability to simultaneously compare many shops saves all the time it would have taken to call and compare services in different auto shops

**Auto Shop Owners:**
  - Auto Shop Owners are looking for a steady client base, and we believe that our application will help them to achieve this goal, especially for small independent shops with little to no existing advertisement. With a straightforward and thorough service request process, regular clients have an easy and reliable way to communicate with their existing mechanic, and are increasingly happy to work with them. These request forms streamline the service intake process and save the shops all the time that would have been spent on repeat phone calls, price negotiations, and more.
  - Another important benefit of our product is that it can put your auto shop at the fingertips of many users, with no advertisement necessary. So long as you meet the search criteria, you will come up for users, in an environment where users are more likely to try out new mechanics, and you have increased odds of growing your customer base.
  - Our product directly addresses our users’ needs by acting as a singular platform from which they can connect to, contact, and find various automobile repair shops. Since we allow users to connect to multiple automobile shops on one application, this saves time by making it easy to connect to a multitude of shops/clients instead of responding to numerous independent texts, emails, and calls. 
  - Furthermore, users can search for automobile repair shops that fit their needs, as they can filter by services, location, and possibly ratings. 



#### Q4: How will you build it?

The planned technology stack is MySQL (database), NodeJS with TypeScript (backend), and React (front end). We are not planning on using any libraries at the moment, but may find some useful ones for implementing our chat feature.

We are in a unique situation as our partner has asked us not to deploy our application. The reason for his request is that our application is going to serve as one component of a larger application which he wishes to deploy at a later date. For this reason, we do not currently have deployment plans, but we are waiting for the instructor to approve this decision.
Assuming we are not deploying the application for user use, we only need to ensure we have an appropriate development environment for testing. In order to do this, we are planning to stay on localhost and web sockets, but use an extra computer that one groupmate has at home to host the development environment

Since our application will be attached to other code and potentially taken apart to form a larger application, we are hoping to stick to a microservice inspired backend with a single database. A microservice inspired baskend will allow us to build largely independent subcomponents for tasks such as user registration, quote generation, chat, and others. In order to create user profiles and start service requests, we will make use of the factory design pattern

We will use Google Maps APIs in order to allow users to search for auto shops by location or proximity.

Testing certain features of our application will require a lot of sample data, which we feel is more conducive to manual testing. We plan to use a rigorous set of unit tests on the API calls that we will be creating. We will have sets of tests for each model, based on CRUD functionality.


#### Q5: What are the user stories that make up the MVP?

1. As a user with a broken car, I want to find all nearby mechanics to see which one is adequate for my purposes in an intuitive, easy-to-see manner.
   1. Allow the user to modify the fields for search (price, distance, services, etc)
   2. Display services offered by each auto repair professional on their shop profile
   3. Allow the user to submit a request for a repair quote
   4. Allow the user to additionally converse with the mechanic through a two-way chat system in order to make sure they are a good fit

2. As a user with a broken car, I want to choose a mechanic to work with who gives me the best prices to get the best deal
   1. Allow the user to receive multiple quotes from multiple mechanics
   2. Allow the user to negotiate with the mechanics through online chat2) 
   3. Allow shops to put in fixed prices for certain features to inform users of their rate in advance

3. As a vehicle owner, I want to communicate the issue with my car to get an estimate from a mechanic, but all I know is that there is a funny sound somewhere in the engine
   1. Allow users some flexibility in choosing options for describing issue (e.g. select both ‘engine’ and ‘not sure’)
   2. Give users space for comments to describe their issue
   3. Allow users to send an attachment (e.g. picture of engine, audio clip of sound coming from engine)

4. As an owner of a auto repair shop, I want to get newreach out to potential customers and expand my business
   1. Have shop profile accessible to many nearby potential customers
   2. Allow auto shop posting on the website which potential customers can see3) 
   3. Given a potential customer’s search preferences and filters, appropriate auto shops are displayed and the two sides are able put into directly contact one another

5. As an owner of an auto repair shop, I no longer want to spend time playing ‘phone-tag’ with potential customers to explain my services and availability, so that I can spend more time working on repairs
   1. Allow shop owners to communicate efficiently with customers (e.g. chat mechanism where only need to write answers once for customer to view at their convenience)
   2. Relevant shop information is at users’ fingertips
   3. Users can filter for shops so that shops are only hearing from customers that are a good potential match
   4. Quote system allows users to put most of their questions or concerns in one place at once

----
## Intellectual Property Confidentiality Agreement 
We will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual. 

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

| Name      | Role | Responsibilities | Strengths | Weakness
| ------- | ------------------ | ----------------- | ----------- | -----------
| Ling    | Backend, Testing |  Focus on API development and head of testing | REST APIs, Testing (Unit, Acceptance, etc), Python | All things frontend (React, HTML/CSS, etc), Javascript/Typescript, Code documentation
| Brian   | Scrum Master, Full Stack | Work with both frontend and backend for seamless integration | React, Web development, REST API | Relational databases, SQL, Automated Testing/CI/CD |
| Kevin   | Frontend, Testing |  Deploy dynamic and responsive UI elements and testing | UI design, Front end design, Automated testing | API, Web backend, Documentation |
| Harry   | Frontend | Developing components on the Frontend | UI design, Front end development | Web backend, API development, Cloud, Automated testing |
| Tehilla | DevOps, Architect, Backend | High level design and dependencies, Overseeing report writing and documentation, Work to develop backend features | Python, Java, Web backend | Databases, automated testing, React |
| Bradley | Full Stack, Testing | Work where needed on frontend and backend teams | Design, Python, Documentation | SQL, Database Management, APIs |
| Daniel  | Client Communicator, Full Stack | Work on both front-end dev and back-end | MySQL, APIs, PHP | Front-end, Testing, UI/UX |


#### Q7: What operational events will you have as a team?

We will be meeting mostly online on Discord or during tutorial, at least once a week. Initial meetings are the entire group and very design and scope focused. Once we split up into subteams for given tasks, those subteams will organize internally and meet more often

The purpose of each meeting will be to update each other on progress, difficulties, brainstorm on large issues to reach a democratic solution, or to give general updates.

We initially discussed our concerns with the scope of the project, especially around how 3 teams were going to initially coordinate with each other to make one MVP.  Once we decided to work independently and shorten the scope, we then discussed the expectations and portion of the original scope we were covering. In these sessions, we got permission to build an independent MVP centered around vehicle owner-shop interactions.
Once the rough scope of the project was agreed to, we had short meetings and or discord message threads to establish details such as: the status of UI mockups, approval of user personae we created, decision to base our architecture in microservices for our partner’s future ease, hear about his research into the benefits of using certain platforms.

As a result, we created our own mockups on Figma, chose the user personae included in this file, decided to try and base our architecture in microservices, and decided to use React and Node for fast and light performance with the help of the abundance of good quality documentation and tutorials.
A lot of clarification came from each meeting, and the meetings helped section our work to be better suited for our team. It shortened the scope of the project and removed dependencies from other groups.
  
#### Q8: What artifacts will you use to self-organize?

- Google docs for updating and coordinating on responses
- Github issues for prioritizing and assigning tasks
- Github Milestones to determine work completion
- Discord server for general communication, with channels for subteams
- Discord server for communication with our partner


#### Q9: What are the rules regarding how your team works?

The general culture and atmosphere should be generally casual. 

**Communications:**
 * The group is expected to meet at least once a week to discuss current progress. Outside of the Thursday tutorial sessions on Zoom, all communication should go through Discord. These intra-group communication can be casual as long as they are polite and respectful.
 * For communicating with our partner, we will primarily be using Discord. Should an occasion arise where a discussion with the partner is required, one person from the group can ping the partner through Discord and set up a time. All group members should participate in partner meetings. These discussions should be strictly professional. 
 
**Meetings:**
 * All group members are expected to attend all meetings, and should be available on Discord most of the time. We will note down the content brought up in meetings and update those missing accordingly. We cannot expect everyone to be available at the same time every week, but will be firm concerning communication and group participation. In terms of action items, those are to be distributed by the team members in charge of whatever subfield we are discussingOccasionally missing meetings and messages are acceptable as long as any potential absences are communicated to the group beforehand. In the case of repeated neglegence, the missing member's participation will be noted in group surveys and will be reflected in participation marks throughout the project duration. 

----
## Highlights

1. Initially we were paired with our partner alongside two other groups with the expectation that we would all develop separate components on the same application. However, that was not feasible since it would require the collaboration of over 20 people on various parts of frontend/backend. Instead, we suggested that we all split up and have each team develop their own MVP. Later on our partner can choose to continue with the best one, or try and combine them together. This proposal was greenlit by our partner and served to cut dependency between different groups.
2. We decided to work on customer-shop interactions
3. We realized that our application can’t force trust between customers and shop owners
4. Coordinating modeling to avoid backend/frontend conflicts later

