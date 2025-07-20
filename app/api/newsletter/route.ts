import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("Newsletter API called");

  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    console.log("Request data:", { email, firstName, lastName });

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          error: "Valid email is required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    if (!audienceId) {
      console.error("Missing RESEND_AUDIENCE_ID or RESEND_LIST_ID");
      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    console.log("Using audience ID:", audienceId);

    const normalizedEmail = email.toLowerCase().trim();

    try {
      console.log("Adding contact to Resend...");

      const contactResult = await resend.contacts.create({
        email: normalizedEmail,
        firstName: firstName || "",
        lastName: lastName || "",
        unsubscribed: false,
        audienceId: audienceId,
      });

      console.log("Contact created:", contactResult);

      console.log("Sending welcome email...");

      const emailResult = await resend.emails.send({
        from: "newsletter@manishtamang.com",
        to: normalizedEmail,
        subject: "Thanks for subscribing!",
        html: getWelcomeEmailTemplate(normalizedEmail, firstName),
      });

      console.log("Welcome email sent:", emailResult);

      return NextResponse.json({
        success: true,
        message: "Successfully subscribed and welcome email sent!",
        contactId: contactResult.data?.id,
        emailId: emailResult.data?.id,
      });
    } catch (resendError: any) {
      console.error("Resend API error:", resendError);

      if (
        resendError.message?.includes("already exists") ||
        resendError.message?.includes("duplicate")
      ) {
        return NextResponse.json(
          {
            error: "Email already subscribed",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to subscribe",
          details: resendError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("Newsletter API GET called");

  try {
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const audienceId =
      process.env.RESEND_AUDIENCE_ID || process.env.RESEND_LIST_ID;

    return NextResponse.json({
      message: "Newsletter API is running",
      timestamp: new Date().toISOString(),
      config: {
        hasApiKey,
        hasAudienceId: !!audienceId,
        audienceId: audienceId,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Configuration error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

function getWelcomeEmailTemplate(email: string, firstName?: string): string {
  const name = firstName ? `, ${firstName}` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Manish Tamang Newsletter</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #3EB76C; margin: 0; }
    .content { margin-bottom: 30px; }
    .button { display: inline-block; background: #3EB76C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
    .social-links { text-align: center; margin: 20px 0; }
    .social-links a { margin: 0 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Manish Tamang Newsletter!</h1>
    </div>
    
    <div class="content">
      <p>Hi there${name}!</p>
      
      <p>Thank you for subscribing to my newsletter! I'm excited to have you join our community of developers and tech enthusiasts.</p>
      
      <p>You'll receive:</p>
      <ul>
        <li>Weekly updates on web development</li>
        <li>Coding tips and tutorials</li>
        <li>Tech industry insights</li>
        <li>Exclusive content and resources</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="https://www.manishtamang.com" class="button">Visit My Website</a>
      </div>
    </div>
    
    <div class="social-links">
      <a href="https://github.com/Manish-Tamang">GitHub</a>
      <a href="https://linkedin.com/in/manish-tamang">LinkedIn</a>
      <a href="https://twitter.com/ManishTamangxyz">Twitter</a>
      <a href="https://youtube.com/@golecodes">YouTube</a>
    </div>
    
    <div class="footer">
      <p>This email was sent to ${email}</p>
      <p>
        <a href="https://www.manishtamang.com/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> | 
        <a href="https://www.manishtamang.com">Visit Website</a>
      </p>
      <p>&copy; 2025 Manish Tamang. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}
