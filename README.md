SMTP MailProvider for [node-transacemail](https://github.com/FGRibreau/node-transacemail)
===========================================

Usage
=====

```JavaScript
var Mailing = require('transacemail');

var mails = Mailing
              .compile('/path/to/mails')
              .setMailProvider(require('transacemail-smtp')(smtpOptions)); // see smtp options at https://github.com/nodemailer/nodemailer#set-up-smtp

// OR
var SMTP = require('transacemail-smtp');

var mails = Mailing
              .compile('/path/to/mails')
              .setMailProvider(SMTP(smtpOptions, { // see smtp options at https://github.com/nodemailer/nodemailer#set-up-smtp
                subject: "node-transacemail-smtp",
                from: "smtp@transacemail.com",
                fromname: "Francois-Guillaume Ribreau"
              }));
```

## Donate

I maintain this project in my free time, if it helped you please support my work via [paypal](https://paypal.me/fgribreau) or [bitcoins](https://www.coinbase.com/fgribreau), thanks a lot!
