// Common Meteor Imports for App
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

// App Components
import { AuthService } from '/imports/auth/client/auth-service';

// Common NPM Imports for App
import * as _ from 'lodash';

// Template Component
import './login.html';


/**
 * Template Created
 *
 * Event fired when the Template has been Created
 *
 * @param {Function} callback The function to run when the Template has been created
 */
Template.login.onCreated(function loginOnCreated() {
    this.authService = AuthService.instance();
    this.loginError = new ReactiveVar({});
});


/**
 * Template Helpers
 *
 * Register of Helpers for the Template
 */
Template.login.helpers({

    /**
     * Gets the Login Error Message if any
     */
    loginError() {
        return Template.instance().loginError.get();
    },

    /**
     * Checks if there is any Login Error Messages
     */
    hasLoginError() {
        return !_.isUndefined(Template.instance().loginError.get().error);
    }

});


/**
 * Template Events
 *
 * Register of Events Hooked by the Template
 */
Template.login.events({

    /**
     *
     */
    'submit #loginForm': function loginSubmitForm(event, instance) {
        var email = event.target.email.value;
        var password = event.target.password.value;
        event.preventDefault();

        // Clear any previous error message
        instance.loginError.set({});

        // Login using AuthService
        instance.authService.login(email, password)
            .then(() => {
                let url = '/dashboard';
                if (instance.authService.redirectUrl.length) {
                    url = instance.authService.redirectUrl;
                }
                FlowRouter.go(url);
            }, (err) => {
                instance.loginError.set(err);
            });
    }

});
