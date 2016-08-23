// Meteor Components
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// App Components
import { denodeify } from '/imports/utils/denodeify';

// Convert Node-Style functions with callbacks to return Promises instead
const _loginWithPassword = denodeify(Meteor.loginWithPassword);
const _logoutOtherClients = denodeify(Meteor.logoutOtherClients);
const _logout = denodeify(Meteor.logout);
const _forgotPassword = denodeify(Accounts.forgotPassword);

// Namespaced Sessions for Requests Page
//  defined globally to be accessible from all requests templates
export const authSession = Session.getNamespace('App.AuthSession');

/**
 * Authentication Service for the App
 */
export class AuthService {

    /**
     * Singleton Pattern
     *  -- Do not instantiate an object of this Class; instead use the
     *     singleton instance accessor as follows:
     *       var authService = AuthService.instance();
     *       authService.login(...)
     *
     * @private
     * @constructor
     */
    constructor() {
        this._redirectTo = '';
    }

    /**
     * Get a Singleton Instance of the Auth Service Class
     *
     * @returns {AuthService} - A singleton instance of the AuthService class
     */
    static instance() {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    /**
     * Log into the App via Email/Password
     *   - Also logs other clients out if logged in under same account
     *
     * @param {string} email - The email address of the user
     * @param {string} password - The password of the user
     * @returns {Promise.<T>} - A promise for the status of the login action
     */
    login(email, password) {
        return _loginWithPassword(email, password)
            .then(() => {
                authSession.set('loggedIn', true);
                return _logoutOtherClients();
            });
    }

    /**
     * Logout of the App
     *
     * @return {Promise.<T>} - A promise for the status of the logout action
     */
    logout() {
        return _logout()
            .then(() => {
                authSession.set('loggedIn', false);
            });
    }

    /**
     * Recover Lost Account Password
     *
     * @param {string} email - The email address to Recover a Lost Account Password for
     * @return {Promise<any>} - A promise for the status of the recover action;
     *                          will reject if the email is not found.
     */
    recover(email) {
        return _forgotPassword({ email });
    }

    /**
     * Check if a user is currently Logged In
     *
     * @returns {boolean} - True if the user is Logged In; False otherwise
     */
    isLoggedIn() {
        return !!Meteor.userId();
    }

    /**
     * Check for a Redirect URL after Login
     *
     * @returns {string} - The Redirect URL
     */
    get redirectUrl() {
        return this._redirectTo;
    }

    /**
     * Set a Redirect URL for after Login
     *
     * @param {string} url - The URL to Redirect to after Login
     */
    set redirectUrl(url) {
        this._redirectTo = url;
    }
}

// Static Instance Member for Singleton Pattern
AuthService._instance = null;

// Default Export
export default AuthService;
