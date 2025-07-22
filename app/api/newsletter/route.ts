import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY || process.env.api;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "newsletter@manishtamang.com",
        to: email,
        subject: "Thanks for subscribing!",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription - Manish Tamang</title>
</head>
<body style="margin:0;padding:20px;font-family:Arial,sans-serif;background-color:#fff;line-height:1.6;">
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
        <a href="https://www.youtube.com/@golecodes" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;text-decoration:none;" target="_blank">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#FF0000"/><path d="M10 15.5V8.5L16 12L10 15.5Z" fill="white"/></svg>
        </a>
        <a href="https://twitter.com/ManishTamangxyz" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;text-decoration:none;" target="_blank">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#1DA1F2"/><path d="M19.633 7.997c-.508.226-1.054.379-1.626.448a2.828 2.828 0 0 0 1.24-1.563 5.657 5.657 0 0 1-1.793.685A2.822 2.822 0 0 0 12 10.29c0 .222.025.438.073.645A8.01 8.01 0 0 1 5.67 7.15a2.822 2.822 0 0 0 .873 3.77 2.8 2.8 0 0 1-1.278-.353v.036a2.825 2.825 0 0 0 2.263 2.768c-.258.07-.53.108-.81.108-.198 0-.388-.019-.574-.054a2.828 2.828 0 0 0 2.64 1.96A5.66 5.66 0 0 1 4 17.13a7.978 7.978 0 0 0 4.29 1.257c5.148 0 7.967-4.266 7.967-7.967 0-.121-.003-.242-.009-.362A5.7 5.7 0 0 0 20 7.548a5.657 5.657 0 0 1-1.633.449z" fill="white"/></svg>
        </a>
        <a href="https://instagram.com/golecodes" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;text-decoration:none;" target="_blank">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#E1306C"/><path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z" fill="white"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
        </a>
        <a href="https://linkedin.com/in/manish-tamang" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;text-decoration:none;" target="_blank">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#0077B5"/><path d="M8.5 10.5H10.5V17H8.5V10.5ZM9.5 9.5C10.0523 9.5 10.5 9.05228 10.5 8.5C10.5 7.94772 10.0523 7.5 9.5 7.5C8.94772 7.5 8.5 7.94772 8.5 8.5C8.5 9.05228 8.94772 9.5 9.5 9.5ZM12.5 10.5H14.5V11.25C14.5 10.8358 14.8358 10.5 15.25 10.5C15.6642 10.5 16 10.8358 16 11.25V17H14V13.5C14 13.2239 13.7761 13 13.5 13C13.2239 13 13 13.2239 13 13.5V17H12.5V10.5Z" fill="white"/></svg>
        </a>
        <a href="https://facebook.com/Manishgoletamang" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;text-decoration:none;" target="_blank">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#1877F3"/><path d="M15.5 8.5H14.5C13.9477 8.5 13.5 8.94772 13.5 9.5V10.5H15.5V12.5H13.5V17H11.5V12.5H10.5V10.5H11.5V9.5C11.5 8.11929 12.6193 7 14 7H15.5V8.5Z" fill="white"/></svg>
        </a>
        <a href="https://github.com/Manish-Tamang" style="width:40px;height:40px;background-color:#9ca3af;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 8px;text-decoration:none;" target="_blank">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#333"/><path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5Z" fill="white"/></svg>
        </a>
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
