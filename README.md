# SocNET-full-stack-with-React

## Socnet

This is a MERN stack application from the MERN Stack Front To Back.
It is a small social network app that includes authentication, profiles and forum posts.

## Link to Open the deployed app deployed to Heroku

https://protected-beyond-41189.herokuapp.com/

## Install server dependencies

npm install

## Install client dependencies

cd client

npm install

## Run both server and client from root

npm run dev

## Redux subscription to manage local storage

The rules of redux say that our reducers should be pure and do just one thing.

If you're not familiar with the concept of pure functions, they must do the following..

Return the same output given the same input.
Have no side effects.
So our reducers are not the best place to manage local storage of our auth token. Ideally our action creators should also just dispatch actions, nothing else. So using these for additional side effects like setting authentication headers is not the best solution here.

Redux provides us with a store.subscribe listener that runs every time a state change occurs.

We can use this listener to watch our store and set our auth token in local storage and axios headers accordingly.

if there is a token - store it in local storage and set the headers.
if there is no token - token is null - remove it from storage and delete the headers.
The subscription can be seen in client/src/store.js

We also need to change our client/src/utils/setAuthToken.js so it now handles both the setting of the token in local storage and in axios headers.

With those two changes in place we can remove all setting of local storage from client/src/reducers/auth.js. And remove setting of the token in axios headers from client/src/actions/auth.js. This helps keep our code predictable, manageable and ultimately bug free.

## Component reuse

The EditProfile and CreateProfile have been reduced to one component ProfileForm.js
The majority of this logic came from the refactrored EditProfile Component.

## Log user out on token expiration

If the Json Web Token expires then it should log the user out and end the authentication of their session.

We can do this using a axios interceptor together paired with creating an instance of axios.
The interceptor, well... intercepts any response and checks the response from our api for a 'Token is not valid' message.
ie. the token has now expired and is no longer valid.
If such a message exists then we log out the user and clear the profile from redux state.

You can see the implementation of the interceptor and axios instance in utils/api.js

Creating an instance of axios also cleans up our action creators in actions/auth.js, actions/profile.js and actions/post.js

## App Info

Author: Ezeike Promise Chiemela
Version: 1.0.0
