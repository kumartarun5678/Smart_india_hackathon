const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const crypto = require('crypto');
const sendResetPasswordEmail = require('../models/sendResetPasswordEmail');

const JWT_SECRET = 'YourSecretKeyHere'; // Replace with your actual secret key

// const generateUniqueToken = () => {
//   return uuidv4(); // Generate a unique UUID
// };


// Function to generate a unique token
const generateUniqueToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: 'Please try to login with correct credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: 'Please try to login with correct credentials' });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE 4: Forgot Password: POST "/api/auth/forgotpassword". No login required
router.post('/forgotpassword', async (req, res) => {
  const { email, senderEmail, senderPassword, emailServiceProvider } = req.body;
  
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Generate a unique token (e.g., using uuid or any token generator)
    const resetToken = generateUniqueToken();

    // Set a reset token and expiration time for the user
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();
    const transporter = nodemailer.createTransport({
      host: emailServiceProvider,
      port: 8000, // Verify that this is the correct port
      secure: false, // Check if you need to use secure (TLS) connection
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });
    
    // Add debugging statements
    console.log('SMTP Server Host:', emailServiceProvider);
    console.log('SMTP Server Port:', 587); // Check if this is correct
    console.log('Sender Email:', senderEmail);
    
    transporter.verify(function (error, success) {
      if (error) {
        console.error('SMTP Server Connection Error:', error);
      } else {
        console.log('SMTP Server Connection Success:', success);
      }
    });
    

    // Send a reset password email to the user's email address with a link containing the token
    // Use the provided SMTP credentials and email service provider
    await sendResetPasswordEmail(emailServiceProvider, senderEmail, senderPassword, email, resetToken);

    res.json({ success: 'Password reset email sent' });
  } catch (error) {
    console.error("SMTP Error:", error.message);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;

