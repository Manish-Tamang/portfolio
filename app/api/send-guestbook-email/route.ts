import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { userEmail, userName, message } = await req.json();

    if (!userEmail || !userName || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userMailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Message!</title>
    <style>
        body {
            background-color: #ffffff;
            color: #3F3D56;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        a {
            color: #007aff;
            text-decoration: none;
        }
        .container {
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .content {
            padding: 45px;
        }
        .header-img {
            width: 100%;
            max-width: 570px;
            display: block;
            margin: 0 auto;
        }
        .message-text {
            font-size: 16px;
            line-height: 1.5;
            margin: 16px 0;
        }
        .footer {
            padding: 20px;
            text-align: center;
        }
        .social-links img {
            width: 32px;
            margin: 0 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://www.manishtamang.com/img/twitter-banner.jpg" 
             alt="Header Banner" 
             class="header-img">

        <div class="content">
            <div class="message-text">
                Dear ${userName},
            </div>
            
            <div class="message-text">
                Thank you for taking the time to leave a message in my guestbook! 
                I truly appreciate your kind words and feedback.
                <p style="margin-top: 1.5rem;">
                    It’s always great to hear from visitors like you. 
                    Your thoughts inspire me to keep improving and creating meaningful experiences.
                </p>
                <p><strong>Your message:</strong> ${message}</p>
            </div>

            <div class="message-text">
                Happy coding,<br>
                Manish Tamang<br>
                (This email was automatically sent by Next.js routes after your message triggered the email API.)
            </div>
        </div>

        <div class="footer">
            <strong>Manish Tamang</strong>
            <div class="social-links" style="margin: 15px 0;">
                <a href="https://www.linkedin.com/in/manish-tamang/" target="_blank">
                    <img src="https://img-cache.net/im/4960397/222244d31eb97bf87c97e39cfae167967c2db928fe79536e6baca38c96337154.png" alt="LinkedIn">
                </a>
                <a href="https://www.tiktok.com/@golecodes" target="_blank">
                    <img src="https://img-cache.net/im/4960397/32fb8fcf2cc04286d7d1556f0f59caa593793220b21086c6f2b55695b579da69.png" alt="TikTok">
                </a>
                <a href="https://x.com/Manishtamangxyz" target="_blank">
                    <img src="https://img-cache.net/im/4960397/5552a635561d4d09365e834d1b5ca6a83228eb2e312512a614332f72fd0ffeb8.png" alt="X">
                </a>
                <a href="https://www.facebook.com/manishgoletamang" target="_blank">
                    <img src="https://img-cache.net/im/4960397/71a0680b06c995e6030190a5c9d1420b7c20f80c36597f2144666c2b62a52d60.png" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/codewithmanish_/" target="_blank">
                    <img src="https://img-cache.net/im/4960397/c2c25c4d2076c7f37112ced457f98550565bdfc92294241b91ec5dff5262f4ac.png" alt="Instagram">
                </a>
            </div>
        </div>
    </div>
</body>
</html>
`;

    const ownerMailContent = `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
              <h2 style="color: #38A662;">New Guestbook Entry</h2>
              <p>You have a new guestbook entry from:</p>
              <p><strong>Name:</strong> ${userName}</p>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
          </div>
        `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject: "Thank You for Your Message",
      html: userMailContent,
    });

    if (process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        subject: "New Guestbook Entry",
        html: ownerMailContent,
      });
    }

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
