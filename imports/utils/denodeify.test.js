/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// Test Components
import { chai } from 'meteor/practicalmeteor:chai';

// App Components
import { denodeify } from './denodeify.js';


//
// Begin Tests
//
describe('Denodeify Utility', function () {
    it('returns a Promise instead of firing a Callback', function (done) {
        const curryCallbackFunc = (...args) => (callback) => {
            callback(...args);
        };

        const denodifiedSuccess = denodeify(curryCallbackFunc(false, 'success'));
        const denodifiedFailure = denodeify(curryCallbackFunc('failure'));

        denodifiedSuccess()
            .then((val) => {
                chai.expect(val).to.equal('success');

                return denodifiedFailure()
                    .catch((err) => {
                        chai.expect(err).to.equal('failure');
                        done();
                    });
            });
    });
});
