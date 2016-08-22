import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';

const withDiv = function withDiv(callback) {
    const el = document.createElement('div');
    document.body.appendChild(el);
    try {
        callback(el);
    } finally {
        document.body.removeChild(el);
    }
};

export const withRenderedTemplate = function withRenderedTemplate(template, data, callback) {
    withDiv((element) => {
        const ourTemplate = _.isString(template) ? Template[template] : template;
        const view = Blaze.renderWithData(ourTemplate, data, element);
        const instance = view._domrange.members[0].view.templateInstance();
        Tracker.flush();
        callback(instance, element);
    });
};

export default withRenderedTemplate;
