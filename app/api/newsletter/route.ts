import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send email using Resend
    const apiKey = process.env.RESEND_API_KEY || process.env.api;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "newsletter@manishtamang.com", // Change to your verified sender
        to: email,
        subject: "Thanks for subscribing!",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription - Manish Tamang</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin:0;padding:20px;font-family:Arial,sans-serif;background-color:#f9f9f9;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background-color:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="padding:40px 32px;text-align:center;">
      <h1 style="font-size:28px;font-weight:bold;color:#1f2937;margin-bottom:24px;line-height:1.3;">
        Welcome to the <span style="color:#3EB76C;">Manish Tamang</span> Newsletter!
      </h1>
      <p style="color:#6b7280;font-size:16px;margin-bottom:32px;line-height:1.5;">
        Thank you for subscribing to Manish Tamang’s newsletter!<br>
        You’ll now receive weekly updates on tech, coding, and more.<br>
        We’re excited to have you with us.
      </p>
      <a href="#" style="background-color:#3EB76C;color:white;padding:12px 32px;border-radius:24px;text-decoration:none;font-weight:600;display:inline-block;border:none;cursor:pointer;">Visit Website</a>
    </div>
    <div style="background-color:#e5e7eb;padding:32px;text-align:center;">
      <div style="font-size:12px;color:#4b5563;margin-bottom:24px;">
        <a href="https://www.manishtamang.com/guestbook" style="color:#3EB76C;text-decoration:none;">Guestbook</a> |
        <a href="https://app.daily.dev/squads/webnepal" style="color:#3EB76C;text-decoration:none;">Community</a> |
        <a href="https://www.manishtamang.com/contact" style="color:#3EB76C;text-decoration:none;">Contact</a>
      </div>
      <div style="margin-bottom:24px;">
        <span style="display:inline-flex;align-items:center;">
          <span style="width:40px;height:40px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-right:12px;vertical-align:middle;overflow:hidden;background:#fff;">
            <img src="https://www.manishtamang.com/profile.png" alt="Manish Tamang" style="width:100%;height:100%;object-fit:cover;" />
          </span>
          <span style="color:#3EB76C;font-weight:bold;font-size:20px;vertical-align:middle;">Manish Tamang</span>
        </span>
        <div style="color:#6b7280;font-size:14px;margin-top:8px;">More than a newsletter.</div>
      </div>
      <div style="margin:24px 0;">
        <a href="https://www.youtube.com/@golecodes" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;color:white;text-decoration:none;font-size:18px;" target="_blank"><i class="fab fa-youtube"></i></a>
        <a href="https://twitter.com/ManishTamangxyz" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;color:white;text-decoration:none;font-size:18px;" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com/golecodes" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;color:white;text-decoration:none;font-size:18px;" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://linkedin.com/in/manish-tamang" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;color:white;text-decoration:none;font-size:18px;" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://facebook.com/Manishgoletamang" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;color:white;text-decoration:none;font-size:18px;" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://github.com/Manish-Tamang" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;color:white;text-decoration:none;font-size:18px;" target="_blank"><i class="fab fa-github"></i></a>
      </div>
      <div style="font-size:12px;color:#6b7280;line-height:1.4;">
        <p>manishtamang.com</p>
        <p>
          This email was sent to <a href="#" style="color:#3EB76C;text-decoration:none;">${email}</a>.
          <a href="#" style="color:#3EB76C;text-decoration:none;">Update your notification settings</a> or
          <a href="https://manishtamang.com/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color:#3EB76C;text-decoration:none;">unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
