'use strict';

var _ = require('lodash');
var deepExtend = require('deep-extend');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function MailProvider(smtpOptions, emailOptions) {
  if (!_.isString(smtpOptions) &&  !_.isObject(smtpOptions)) {
    throw new Error('You need to provide valid smtp options, see https://github.com/nodemailer/nodemailer#set-up-smtp');
  }

  this.options = deepExtend({}, MailProvider.DEFAULT_OPTION, emailOptions);

  if(!this.options.from || this.options.from.indexOf('<') === -1 || this.options.from.indexOf('>') === -1){
    throw new Error('`from` option should be in RFC format "sender name <sender@email.com>"');
  }

  this.transporter = nodemailer.createTransport(smtpTransport(smtpOptions));
}

/**
 * Debug mode
 * @type {Boolean}
 */
MailProvider.DEBUG_MODE = false;

/**
 * Default options
 * @type {Object}
 */
MailProvider.DEFAULT_OPTION = {
  // we force the user to specify a from
  subject: "node-transacemail-smtp"
};

/**
 * Send method
 * @param  {Object}   mail TransacEmail Mail object
 * @param  {Function} fn   Callback to call when done
 */
MailProvider.prototype.send = function(mail, fn) {
  if (!mail.data || !mail.data.email) {
    throw new Error("The `email` field is required");
  }

  var options = deepExtend({}, this.options, mail.options, {
    /**
     * HTML content
     * @type {String}
     */
    html: mail.html,

    /**
     * Text content
     * @type {String}
     */
    text: mail.text,

    /**
     * To email
     * @type {String}
     */
    to: mail.data.email,

    /**
     * To user name
     * @type {String}
     */
    toname: mail.data.name
  });

  if (MailProvider.DEBUG_MODE) {
    console.log("Sending an email to " + mail.data.email);
    console.log(JSON.stringify(options, null, 2));
    fn(null, [{
      email: mail.data.email,
      status: 'sent'
    }]);
    return;
  }

  this.transporter.sendMail(options, function(err, response) {
    if (err) {
      return f(err);
    }

    return fn(null, [{
      email: options.to,
      status: 'sent'
    }]);
  });
};

/**
 * TransacEmail-SMTP factory
 * @param  {Object} smtpOptions        (see all options: https://github.com/nodemailer/nodemailer#set-up-smtp)
 * @param  {Object} emailOptions       Default send option
 * @return {MailProvider}
 */
function Factory(smtpOptions, emailOptions) {
  return new MailProvider(smtpOptions, emailOptions || {});
}

Factory.MailProvider = MailProvider;
module.exports = Factory;
