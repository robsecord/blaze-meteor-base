// Common Meteor Imports for App
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Common App Display Pipes
import '/imports/ui/pipes/common.js';

// App Routes
import './routes';

// CDN Assets
import './cdn-assets';


// Get Current-User details before initializing Flow Router.
// FlowRouter.wait();
// Tracker.autorun(function() {
//     if (Roles.subscription.ready() && !FlowRouter._initialized) {
//         return FlowRouter.initialize();
//     }
// });

/**
 *
 * @param fromStartup
 */
var resetSession = function startupResetSession(fromStartup) {
    var _set = fromStartup ? 'setDefault' : 'set';

    Session[_set]('loggedIn', false);
    Session[_set]('redirectAfterLogin', '');
};

/**
 * Client Startup - Equivalent to DOMReady event
 */
Meteor.startup(() => {
    // Default Sessions on Startup
    resetSession(true);
});


// If a user is logged out from another client via `Meteor.logoutOtherClients()`
//  let's redirect the user to the Public Welcome Page
Tracker.autorun(() => {
    if (!Meteor.userId()) {
        if (Session.get('loggedIn')) {
            const route = FlowRouter.current();
            if (route.route.name !== 'app.home') {
                Session.set('redirectAfterLogin', route.path);
            }
            return FlowRouter.go(FlowRouter.path('app.welcome'));
        }
    }
});
