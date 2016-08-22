/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

//import { Factory } from 'meteor/factory';
import { Promise } from 'meteor/promise';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

// App Components
import { AuthService } from '/imports/auth/client/auth-service';
import { withRenderedTemplate } from '/imports/utils/test-helpers';
import './login.js';

const promiseResponse = 'for testing';
const mockAuthServiceInstance = AuthService.instance();
mockAuthServiceInstance.login = () => Promise.reject(promiseResponse);

//
// Begin Tests
//
describe('Login Component', function () {
    it('renders correct elements', function () {
        // Render Template
        withRenderedTemplate('login', {}, (instance, element) => {
            // Check for Template Elements
            const $form = $(element).find('form#loginForm');
            chai.assert.equal($form.length, 1);
            chai.assert.equal($form.find('[name="email"]').length, 1);
            chai.assert.equal($form.find('[name="password"]').length, 1);
            chai.assert.equal($form.find('[type="submit"]').length, 1);
        });
    });

    it('submits form', function (done) {
        // Render Template
        withRenderedTemplate('login', {}, (instance, element) => {
            const $form = $(element).find('form#loginForm');
            const _instance = instance;

            // Mock the AuthService
            _instance.authService = mockAuthServiceInstance;

            // Fire Event on Template
            Template.login.fireEvent('submit #loginForm', {
                event: {target: $form[0], preventDefault: () => false},
                templateInstance: _instance
            });

            // Perform Assertions
            setTimeout(() => {
                chai.expect(_instance.loginError.get()).to.equal(promiseResponse);
                done();
            }, 1);
        });
    });
});
