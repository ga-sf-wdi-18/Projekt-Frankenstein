## Architecture

Projekt-Frankenstein has two models, User and Story. The User model holds usernames and passwords which are hashed via Bcrypt. The Story model is one Collection with a single Document inside containing all story text as a single string.

##  Functionality
From the landing page users can longin or click a button that takes them to the register page.

After registering or loging in users are automatically taken to the story page.

From the story page users can submit text via text area to be added to the story content above the textarea asynchronously.

Link to Heroku App: https://thawing-scrubland-4701.herokuapp.com/

### Technolologies used

1. Mongodb
2. Node
3. Nodemon
4. Express
5. Bootstrap
6. Bcrypt
7. Sketch
8. Body-parser
9. request
10. Mongoose
11. Bower
12. Jquery
13. Trello
14. Git
15. Github
16. Atom
17. Heroku

### Known Issues

1. No logout button
2. DB Model stores story as one string affecting scalability
3. Story page text formatting bad UX
4. Not working on Heroku

