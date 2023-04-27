
/* I andra filer skriv "import sendEmail from './sendEmail.js';"
Sedan kallar på den genom att ge, sendEmail('someUserEmail, 'templateID');
Man kan göra olika templates som man kan skicka till en user.
Har bara gjort en standard "Time to watar your plants".
*/

 // Time to water your plant templateID: 'd-b5948ccc05594a61bc734691226170f7'

const sgMail = require('@sendgrid/mail');

const API_KEY = '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';

const TimeToWater = 'd-b5948ccc05594a61bc734691226170f7';

sgMail.setApiKey(API_KEY);

    function sendEmail(to, templateId){
        const message = {
            to: to,
            from: 'potbotapp@gmail.com',
            templateId: templateId
          };
          return sgMail.send(message)
    }

// Ska användas på detta sätt
    /*sendEmail('mahadah@kth.se', TimeToWater).then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });*/

export default sendEmail;
