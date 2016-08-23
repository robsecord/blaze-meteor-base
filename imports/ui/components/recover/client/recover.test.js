/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Promise } from 'meteor/promise';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

// App Components
import { withRenderedTemplate } from '/imports/utils/test-helpers';
import { AuthService } from '/imports/auth/client/auth-service';
import './recover.js';

// Mock the AuthService Component
const promiseResponse = 'for testing';
const mockAuthServiceInstance = AuthService.instance();
mockAuthServiceInstance.recover = () => Promise.reject(promiseResponse);

//
// Begin Tests
//
describe('Recover Component', function () {
    // Remove any rendered templates after each assertion-block
    var _renderedView = null;
    afterEach(function () {
        if (_renderedView !== null) {
            Blaze.remove(_renderedView);
            _renderedView = null;
        }
    });

    // Test that the Recover Component renders the correct Form Elements
    //  to the Template
    it('renders correct elements', function (done) {
        // Render Template
        withRenderedTemplate('recover', {}, (view, instance, element) => {
            _renderedView = view;

            // Check for Template Elements
            const $form = $(element).find('form#recoverForm');
            chai.assert.equal($form.length, 1);
            chai.assert.equal($form.find('[name="email"]').length, 1);
            chai.assert.equal($form.find('[type="submit"]').length, 1);
            done();
        });
    });

    // Test that the Form Submit event is correctly hooked, and initiates a call
    //  to the AuthService recover() method.  We are not testing the AuthService here.
    it('submits form', function (done) {
        // Render Template
        withRenderedTemplate('recover', {}, (view, instance, element) => {
            _renderedView = view;

            const $form = $(element).find('form#recoverForm');
            const _instance = instance;

            // Attach Mocked AuthService to Template Instance
            _instance.authService = mockAuthServiceInstance;

            // Fire Event on Template
            Template.recover.fireEvent('submit #recoverForm', {
                event: {target: $form[0], preventDefault: () => false},
                templateInstance: _instance
            });

            // Perform Assertions
            setTimeout(() => {
                chai.expect(_instance.emailError.get()).to.equal(promiseResponse);
                done();
            }, 1);
        });
    });
});
