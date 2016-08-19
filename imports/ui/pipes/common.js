// Meteor Components
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import * as _ from 'lodash';


/**
 *
 */
export const FormatPipes = {

    /**
     *
     * @param {string|*} errorValue
     * @returns {string|*}
     */
    asFriendlyErrorMsg(errorValue) {
        // Get Error Message
        let err = errorValue;
        if (_.has(err, 'reason')) { err = err.reason; }
        if (_.has(err, 'message')) { err = err.message; }

        // Strip error codes from beginning or end of message;
        //  - [400] sample error
        //  - sample error [400]
        err = err.replace(/^\[[\d]+]\s?|\s?\[[\d]+]$/g, '');

        // Prevent exposing specific auth errors
        let defaultAuthError = 'Invalid credentials';
        err = /user not found/i.test(err) ? defaultAuthError : err;
        err = /incorrect password/i.test(err) ? defaultAuthError : err;

        // Return Friendly Error Message
        return err;
    }

};

//
// Template Formatting Pipes
//

/**
 *
 * @param {string|*} errorValue
 */
Template.registerHelper('asFriendlyErrorMsg', function TemplatePipes_Common_asFriendlyErrorMsg(errorValue) {
    return FormatPipes.asFriendlyErrorMsg(errorValue);
});
