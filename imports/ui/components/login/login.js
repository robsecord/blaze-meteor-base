// Common Meteor Imports
import '/imports/utils/meteor_imports';

// App Components
import { AuthService } from '/imports/auth/client/auth.service';

// Template Component
import './login.html';


/**
 * Template Created
 *
 * Event fired when the Template has been Created
 *
 * @param {Function} callback The function to run when the Template has been created
 */
Template.login.onCreated(function login_onCreated() {
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
        return (!_.isUndefined(Template.instance().loginError.get().error));
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
    'submit #loginForm'(event, instance) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

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
