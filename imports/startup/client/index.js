// Common Meteor Imports for App
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Session Namespacing
import '/imports/startup/client/session-namespace';

// Auth-Session Namespace
import { authSession } from '/imports/auth/client/auth-service';

// Common App Display Pipes
import '/imports/ui/pipes/client/common';

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

    authSession[_set]('loggedIn', false);
    authSession[_set]('redirectAfterLogin', '');
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
        if (authSession.get('loggedIn')) {
            const route = FlowRouter.current();
            if (route.route.name !== 'app.home') {
                authSession.set('redirectAfterLogin', route.path);
            }
            return FlowRouter.go(FlowRouter.path('app.welcome'));
        }
    }
});
