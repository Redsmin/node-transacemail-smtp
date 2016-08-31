'use strict';

const t = require('chai').assert;
const assert = require('assert');

describe('smtp', function() {
  it('should send an email', function(f) {
    assert(process.env.SMTP_HOST, 'process.env.SMTP_HOST environment variable is missing');
    assert(process.env.SMTP_PORT, 'process.env.SMTP_PORT environment variable is missing');
    assert(process.env.SMTP_USER, 'process.env.SMTP_USER environment variable is missing');
    assert(process.env.SMTP_PASS, 'process.env.SMTP_PASS environment variable is missing');

    // require('./').MailProvider.DEBUG_MODE=true;
    const provider = require('./')({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      debug: true,
      auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    provider.send({
      html: '<strong>hello :)</strong>',
      text: 'hello :)',
      from: 'transacemail-sendgrid-test@fgribreau.com',
      data: {
        email: 'transacemail-sendgrid@fgribreau.com',
        name: 'Transacemail Sendgrid'
      }
    }, function(err, result) {
      t.strictEqual(err, null);
      t.deepEqual(result, [{
        email: 'transacemail-sendgrid@fgribreau.com',
        status: 'sent'
      }]);
      f();
    });
  });
});
