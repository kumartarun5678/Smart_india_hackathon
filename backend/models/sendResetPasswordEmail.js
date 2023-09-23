const nodemailer = require('nodemailer');

const sendResetPasswordEmail = async (emailServiceProvider, senderEmail, senderPassword, recipientEmail, resetToken) => {
  try {
    // Create a transporter object using the provided email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: emailServiceProvider,
      auth: {
        user: senderEmail,
        pass: senderPassword,
        // Specify the auth method as "PLAIN"
        authMethod: "PLAIN"
      },
    });

    // Email content
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3000/forgotpassword/${resetToken}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendResetPasswordEmail;
