
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// App Components
import '../../ui/components/root-redirect/root-redirect';

// Primary Page Layouts
import '../../ui/layouts/public-body/public-body';
import '../../ui/layouts/manager-body/manager-body';

// Route Pages
import '../../ui/pages/404/notfound';
import '../../ui/pages/welcome/welcome';
import '../../ui/pages/forgot/forgot';
import '../../ui/pages/dashboard/dashboard';


// Route Group for Managers
var manager = FlowRouter.group({
    triggersEnter: [
        () => {
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                let route = FlowRouter.current();
                if (route.route.name !== 'app.home') {
                    Session.set('redirectAfterLogin', route.path);
                }
                return FlowRouter.go('app.home');
            }
        }
    ]
});

// Route Group for Admins Only
var admin = manager.group({
    prefix: '/admin',
    triggersEnter: [
        //() => {
        //    if (! isInstantAdmin() ) {
        //        return FlowRouter.go('app.dashboard');
        //    }
        //}
    ]
});

// Route Group for all Others (unauthenticated users)
var other = FlowRouter.group({});



//
// System Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//

// 404 - Not Found
FlowRouter.notFound = {
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('manager_body', {main: 'notfound'});
        } else {
            BlazeLayout.render('public_body', { main: 'root_redirect' });
        }
    }
};


//
// "Other" Group Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//

// Root Route
//  - Redirect based on Logged-In State
other.route('/', {
    name: 'app.home',
    action() {
        BlazeLayout.render('public_body', { main: 'root_redirect' });
    }
});

// Welcome
//  - Displays Login Form
other.route('/welcome', {
    name: 'app.welcome',
    action() {
        BlazeLayout.render('public_body', { main: 'welcome' });
    }
});

// Forgot Password
//  - Displays Login Form
other.route('/forgot', {
    name: 'app.forgot',
    action() {
        BlazeLayout.render('public_body', { main: 'forgot' });
    }
});


//
// "Manager" Group Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//

// Dashboard
manager.route('/dashboard', {
    name: 'app.dashboard',
    action() {
        BlazeLayout.render('manager_body', { main: 'dashboard' });
    }
});


//FlowRouter.route('/lists/:_id', {
//    name: 'Lists.show',
//    action() {
//        BlazeLayout.render('app_body', { main: 'Lists_show_page' });
//    }
//});


//
// "Admin" Group Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//

