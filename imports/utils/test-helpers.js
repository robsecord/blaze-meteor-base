/* eslint-disable new-cap */

// Meteor Components
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';
import { _ } from 'meteor/underscore';

// Session Namespacing
import '/imports/startup/client/session-namespace';

// Common App Display Pipes
import '/imports/ui/pipes/client/common.js';

/**
 *
 * @param callback
 */
const withDiv = function withDiv(callback) {
    const el = document.createElement('div');
    document.body.appendChild(el);
    try {
        callback(el);
    } finally {
        document.body.removeChild(el);
    }
};

/**
 *
 * @param template
 * @param data
 * @param callback
 */
export const withRenderedTemplate = function withRenderedTemplate(template, data, callback) {
    withDiv((element) => {
        const ourTemplate = _.isString(template) ? Template[template] : template;
        let view = Blaze.renderWithData(ourTemplate, data, element);
        view = view._domrange.members[0].view;
        const instance = view.templateInstance();
        Tracker.flush();
        callback(view, instance, element);
    });
};

// Default Export for Module
export default withRenderedTemplate;
