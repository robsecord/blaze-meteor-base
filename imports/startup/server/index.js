// Meteor Components
import { Meteor } from 'meteor/meteor';

// Set up some rate limiting and other important security settings.
import './security.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js';


Meteor.startup(() => {
    // code to run on server at startup
});
