require('dotenv').config({path:'./.env'});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  

// Email template
const createEmailTemplate = (data) => `
<html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { color: #2c3e50; border-bottom: 2px solid #107b5f; padding-bottom: 10px; }
            .details { margin: 15px 0; }
            .label { font-weight: bold; color: #107b5f; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2 class="header">New Contact Us Submission</h2>
            <div class="details">
                <p><span class="label">Name:</span> ${data.name}</p>
                <p><span class="label">Email:</span> ${data.email}</p>
                <p><span class="label">Phone:</span> ${data.phone}</p>
                <p><span class="label">Message:</span><br>${data.message}</p>
            </div>
        </div>
    </body>
</html>
`;

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;


          // Get multiple recipients from .env
    //       const recipients = process.env.RECEIVER_EMAILS.split(',')
    //       .map(email => email.trim())
    //       .filter(email => email.length > 0);

    //   if (recipients.length === 0) {
    //       return res.status(500).json({ error: 'No valid recipients configured' });
    //   }
        const mailOptions = {
            from: `"Contact Us" <${process.env.EMAIL_USER}>`,
            to: 'customercare@apelasset.com', 
            subject: 'New Contact Us Submission',
            html: createEmailTemplate({ name, email, phone, message }),
            replyTo: email
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});