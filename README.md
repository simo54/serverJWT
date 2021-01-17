# serverJWT

Node server with signup, login and authentication features.

## Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Express-validator
- bcryptjs

## How to run it locally

1. Clone the project inside your machine

```
git clone https://github.com/simo54/serverJWT.git
```

2. Set up your DB from MongoDB

   - Once you have a running cluster, create a .env file on the root of the project and provide the db url application like the following:
     ```
     DB_CONNECT=url
     ```
   - Include as well a secret password called TOKEN_AUTH:

     ```
     TOKEN_AUTH=topsecretpassword123
     ```

3. Install modules

```
npm i
```

4. Run server

```
npm start
```

## Useful info

JWT token expiration is set to 1 minute, to change it search for **expiresIn** and modify the value.

Be aware of express validation in **signup.js**, there is a min input for the signup, but you can always change it or remove it.

## User Flow using Postman

- Create a user in the path => yourlocalhost/**signup**
- Login with credentials previously submitted => yourlocalhost/**login**
- Create a header with key **authToken** and value from the body request
- To reveal the private data navigate to => yourlocalhost/**private**
