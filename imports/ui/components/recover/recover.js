// Meteor Components
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

// App Components
import { AuthService } from '../../../auth/client/auth.service';

// Template Component
import './recover.html';


/**
 * Template Created
 *
 * Event fired when the Template has been Created
 *
 * @param {Function} callback The function to run when the Template has been created
 */
Template.recover.onCreated(function recover_onCreated() {
    this.authService = AuthService.instance();
    this.emailError = new ReactiveVar('');
});


/**
 * Template Helpers
 *
 * Register of Helpers for the Template
 */
Template.recover.helpers({

    /**
     * Gets the Email Recovery Error Message if any
     */
    emailError() {
        return Template.instance().emailError.get();
    },

    /**
     * Checks if there is any Email Recovery Error Messages
     */
    hasEmailError() {
        return (Template.instance().emailError.get().length > 0);
    }

});


/**
 * Template Events
 *
 * Register of Events Hooked by the Template
 */
Template.recover.events({

    /**
     *
     */
    'submit #recoverForm'(event, instance) {
        event.preventDefault();
        var email = event.target.email.value;

        // Clear any previous error message
        instance.emailError.set('');

        // Recover Email using AuthService
        instance.authService.recover(email)
            .then(() => {
                FlowRouter.go('/welcome', {fromRecover: true});
            }, (err) => {
                instance.emailError.set(err);
            });
    }

});
