const nodemailer = require('nodemailer');

// Set up the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'galidevaravenkatalokesh05@gmail.com', // Your email
    pass: 'Lokesh@13',   // Your email password or app password
  },
});

// Function to send OTP email
const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: 'galidevaravenkatalokesh05@gmail.com',
    to: to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Could not send OTP email.');
  }
};

module.exports = {
  sendOtpEmail,
};
