// Meteor Components
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

/**
 * Create a Safe storage place for Session Variables by Namespacing them.
 *   - This will help prevent collisions in Session-variable names by prefixing
 *     all session variables with a namespace string.
 *
 * @usage
 *   var mySession = Session.getNamespace('MyNamespace');
 *
 *   mySession.set('someValue', 'Hello!');          // Stored in Session as "MyNamespace.someValue"
 *   console.log( mySession.get('someValue') );
 *
 *   // Creating Sub-Sessions:
 *
 *   var subSession = mySession.getNamespace('SubNamespace');
 *
 *   subSession.set('someValue', 'Hello!');          // Stored in Session as "MyNamespace.SubNamespace.someValue"
 *   console.log( subSession.get('someValue') );
 *
 * @param {string} namespace - The unique namespace for the Session Variables
 * @returns {Object} - An API for handling Namespaced Session variables
 * @constructor
 */
export const sessionNamespace = function sessionNamespace(namespace) {
    const prefix = `${namespace}.`;

    return {
        get: (key) => Session.get(`${prefix}${key}`),
        set: (key, value) => Session.set(`${prefix}${key}`, value),
        setDefault: (key, value) => Session.setDefault(`${prefix}${key}`, value),
        equals: (key, value) => Session.equals(`${prefix}${key}`, value),
        getNamespace: (name) => sessionNamespace(`${prefix}${name}`)
    };
};

// Extend Meteor Session to provide Namespacing
_.extend(Session, { getNamespace: sessionNamespace });

// Default Module Export
export default sessionNamespace;
