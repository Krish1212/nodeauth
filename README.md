# nodeauth
Node JS - Express WEB application with authentication module using Passport JS

# Introduction
This small web application uses the following frameworks:
1. Node JS
2. Express
3. Passport
4. Crypto
5. Jade
6. Mongo DB
7. Mongoose
8. Connect-Flash

This application has the following menu items:
1. Members
2. Register
3. Login
4. Logout

Members page can be accessed only when the user is logged in, otherwise it will be redirected to the Login page. 
Register page gets the user information and stores them in the MongoDB database.
Interaction with the MongoDB database is done using Mongoose framework.
Flash messages are displayed using the Connect-Flash framework.

# TODO
1. Create Module for profile image upload and display it in the Members page when the user logs in.
2. Prepare the Members page to output users' blog posts and allow them to create new blogs, view other users' blog posts.
3. Add Comments to other users' blog posts. Like and Share the other users' blog posts.
