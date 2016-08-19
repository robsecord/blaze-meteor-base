// Common Meteor Imports
import '/imports/utils/meteor_imports';

// Meteor Components
//import { ActiveRoute } from 'meteor/zimme:active-route';

// App Components
import { AuthService } from '/imports/auth/client/auth.service';

// Global Constants
import { CONNECTION_ISSUE_TIMEOUT } from '../../../utils/global.constants.js';

// Template Component
import './manager-body.html';


// Watch for Connection Issues
const showConnectionIssue = new ReactiveVar(false);
Meteor.startup(() => {
    setTimeout(() => {
        showConnectionIssue.set(true);
    }, CONNECTION_ISSUE_TIMEOUT);
});



Template.manager_body.onCreated(function manager_body_onCreated() {
    this.authService = AuthService.instance();
});

Template.manager_body.helpers({
});

Template.manager_body.events({

    /**
     * 
     * @param event
     * @param instance
     */
    'click [data-action="logout"]'(event, instance) {
        // Logout using AuthService
        instance.authService.logout()
            .then(() => {
                FlowRouter.go('/welcome');
            });
    }

});