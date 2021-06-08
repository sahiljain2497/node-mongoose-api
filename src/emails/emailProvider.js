const sgMail = require('@sendgrid/mail');
const resetPasswordTemplate = require('./templates/resetPassword');

sgMail.setApiKey(process.env.GRID_API_KEY);

exports.sendPasswordReset = async (token, email) => {
  const resetUrl = `${process.env.APP_DOMAIN}/reset-password?resetToken=${token}`;
  const msg = {
    to: email,
    from: 'support@storbeey.com',
    subject: 'Password Reset Request',
    text: 'Password Reset Request',
    html: resetPasswordTemplate.html(resetUrl),
  };
  sgMail.send(msg).then(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.body);
      }
    },
  );
};
