// Common Meteor Imports
import '/imports/utils/meteor_imports';

// App Routes
import './routes';

// CDN Assets
import './cdn_assets';

// Common App Display Pipes
import '/imports/ui/pipes/common.js';


// Get Current-User details before initializing Flow Router.
//FlowRouter.wait();
//Tracker.autorun(function() {
//    if (Roles.subscription.ready() && !FlowRouter._initialized) {
//        return FlowRouter.initialize();
//    }
//});

/**
 *
 * @param fromStartup
 */
var resetSession = function (fromStartup) {
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
            let route = FlowRouter.current();
            if (route.route.name !== 'app.home') {
                Session.set('redirectAfterLogin', route.path);
            }
            return FlowRouter.go(FlowRouter.path('app.welcome'));
        }
    }
});
