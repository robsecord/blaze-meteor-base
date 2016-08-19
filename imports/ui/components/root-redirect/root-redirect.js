// Meteor Components
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Template Component
import './root-redirect.html';

/**
 * Template Created
 */
Template.root_redirect.onCreated(() => {
    let newRoute = 'app.welcome';
    if (Meteor.userId()) {
        newRoute = 'app.dashboard';
    }
    // Defer so that we don't redirect from inside a redirection
    Meteor.defer(() => {
        FlowRouter.go(newRoute);
    });
});
