const SECRET = require('#src/config/env.config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: {
        user: SECRET.GMAIL_USER,
        pass: SECRET.GMAIL_PASS
    }
});

const sendEmail = async (to, subject, template, context) => {
    try {
        let emailBody = '';
        switch (template) {
            case 'OTP_REGISTRATION':
                emailBody = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .header {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .otp {
            font-size: 18px;
            font-weight: bold;
            color: #007BFF;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Hello ${context.name},</div>
        <p>Thank you for registering with us!</p>
        <p>Here is your One-Time Password (OTP) for completing the registration process:</p>
        <p class="otp">🔒 OTP: ${context.otp}</p>
        <p>This OTP is valid for 1 hour. Please do not share this OTP with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">Best regards,<br>EventHub Team</div>
    </div>
</body>
</html>`;
                break;

            case 'PASSWORD_RESET':
                emailBody = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .header {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .otp {
            font-size: 18px;
            font-weight: bold;
            color: #007BFF;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Hello ${context.name},</div>
        <p>We received a request to reset your password.</p>
        <p>Here is your One-Time Password (OTP) to reset your password:</p>
        <p class="otp">🔒 OTP: ${context.otp}</p>
        <p>This OTP is valid for 1 hour. If you did not request this, please contact our support team immediately.</p>
        <div class="footer">Best regards,<br>EventHub Team</div>
    </div>
</body>
</html>`;
                break;

            default:
                emailBody = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .header {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Hello,</div>
        <p>Thank you for using EventHub. If you have any questions or need assistance, feel free to contact us.</p>
        <div class="footer">Best regards,<br>EventHub Team</div>
    </div>
</body>
</html>`;
        }

        const mailOptions = {
            from: `"EventHub" <${SECRET.GMAIL_USER}>`,
            to: to,
            subject: subject,
            html: emailBody
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        // throw new Error('Error sending email');
    }
};

module.exports = { sendEmail };
