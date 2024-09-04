const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const users = require("../models/Users");
require('dotenv').config();

const User = process.env.ETHEREAL_USER;
const Pass = process.env.ETHEREAL_PASS;

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCred = await users.findOne({ email });

        if (userCred) {
            if (password === userCred.password) {

                const token = crypto.randomBytes(32).toString('hex');
                users[email] = { token, expires: Date.now() + 15 * 60 * 1000 };
                const loginLink = `http://your-app.com/login?token=${token}&email=${encodeURIComponent(email)}`;

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'dejah.rodriguez@ethereal.email',
                        pass: 'npKKrqz6ZYD5CYtKN2'
                    }
                });

                const mailOptions = {
                    from: 'devrup31@gmail.com',
                    to: email,
                    subject: 'Your Login Link',
                    text: `Click the following link to log in: ${loginLink}`,
                    html: '<p>Click the following link to log in: <a href="${loginLink}">Login Link</a></p>'
                };

                await transporter.sendMail(mailOptions);

                res.json({ message: 'Login link sent to your email.' });

            } else {
                res.status(401).json({ message: "Password is incorrect" });
            }
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
