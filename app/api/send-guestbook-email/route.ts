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
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Your Message!</title>
  </head>
  <body
    bgcolor="#ffffff"
    text="#3F3D56"
    link="#007aff"
    yahoo="fix"
    style="background-color: #ffffff"
  >
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      width="100%"
      style="background-color: #ffffff; width: 100%"
    >
      <tr>
        <td>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="600"
            align="center"
            style="table-layout: fixed; width: 600px"
          >
            <tr>
              <td valign="top" style="background-color: #ffffff">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      style="
                        background-color: #ffffff;
                        padding-bottom: 20px;
                        padding-top: 20px;
                      "
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            style="
                              background-color: #ffffff;
                              font-weight: normal;
                            "
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  style="
                                    background-color: #ffffff;
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100"
                                          style="
                                            table-layout: fixed;
                                            width: 100px;
                                          "
                                        >
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td style="background-color: #ffffff">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          line-height: 0px;
                                          valign: top;
                                        "
                                      >
                                        <img
                                          src="https://www.manishtamang.com/img/twitter-banner.jpg"
                                          width="570"
                                          border="0"
                                          style="
                                            display: block;
                                            width: 100%;
                                          "
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      style="
                        background-color: #ffffff;
                        padding-bottom: 45px;
                        padding-left: 45px;
                        padding-right: 45px;
                        padding-top: 45px;
                      "
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td valign="top">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr class="nl2go-responsive-hide">
                                            <td
                                              height="16"
                                              style="
                                                font-size: 16px;
                                                line-height: 16px;
                                              "
                                            >
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              valign="top"
                                              style="
                                                color: #3f3d56;
                                                font-family: Arial;
                                                font-size: 20px;
                                                line-height: 1.3;
                                                word-break: break-word;
                                                text-align: left;
                                              "
                                            >
                                              <div>
                                                <div
                                                  style="
                                                    color: #3f3d56;
                                                    font-family: Arial;
                                                    font-size: 16px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  Dear ${userName},
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr class="nl2go-responsive-hide">
                                            <td
                                              height="16"
                                              style="
                                                font-size: 16px;
                                                line-height: 16px;
                                              "
                                            >
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              valign="top"
                                              style="
                                                color: #3f3d56;
                                                font-family: Arial;
                                                font-size: 20px;
                                                line-height: 1.3;
                                                word-break: break-word;
                                                text-align: left;
                                              "
                                            >
                                              <div>
                                                <div
                                                  style="
                                                    color: #3f3d56;
                                                    font-family: Arial;
                                                    font-size: 16px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  Thank you for taking the time to leave a message in my guestbook! I truly appreciate your kind words and feedback.</p>
              <p style="margin-top: 1.5rem;">It’s always great to hear from visitors like you. Your thoughts inspire me to keep improving and creating meaningful experiences.</p>
              <p><strong>Your message:</strong> ${message}</p>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr class="nl2go-responsive-hide">
                                            <td
                                              height="16"
                                              style="
                                                font-size: 16px;
                                                line-height: 16px;
                                              "
                                            >
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              valign="top"
                                              style="
                                                color: #3f3d56;
                                                font-family: Arial;
                                                font-size: 20px;
                                                line-height: 1.3;
                                                word-break: break-word;
                                                text-align: left;
                                              "
                                            >
                                              <div>
                                                <div
                                                  style="
                                                    color: #3f3d56;
                                                    font-family: Arial;
                                                    font-size: 16px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  Happy coding,
                                                </div>
                                                <div
                                                  style="
                                                    color: #3f3d56;
                                                    font-family: Arial;
                                                    font-size: 16px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  Manish Tamang, Email API Routes
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="100%"
            align="center"
            style="table-layout: fixed; width: 100%"
          >
            <tr>
              <td valign="top" style="background-color: #ffffff">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="600"
                  align="center"
                  style="table-layout: fixed; width: 600px"
                >
                  <tr>
                    <td style="padding-bottom: 20px; padding-top: 20px">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="
                                                font-family: Arial;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p style="margin: 0">
                                                  <strong>Manish Tamang</strong>
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="
                                                font-family: Arial;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                 Itahari, Sunsari, Nepal
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="570"
                                          align="center"
                                          style="
                                            table-layout: fixed;
                                            width: 570px;
                                          "
                                        >
                                          <tr>
                                            <td valign="top">
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                              >
                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="
                                                      display: inline-block;
                                                    "
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="570"
                                                      align="center"
                                                      style="
                                                        table-layout: fixed;
                                                        width: 570px;
                                                      "
                                                    >
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding-left: 189px;
                                                            padding-right: 189px;
                                                          "
                                                        >
                                                          <table
                                                            width="100%"
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                          >
                                                            <tr>
                                                              <th
                                                                width="40"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://www.linkedin.com/in/manish-tamang/"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #007aff;
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://img-cache.net/im/4960397/222244d31eb97bf87c97e39cfae167967c2db928fe79536e6baca38c96337154.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                        />
                                                                      </a>
                                                                    </td>
                                                                    <td
                                                                      class="nl2go-responsive-hide"
                                                                      width="8"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 1px;
                                                                      "
                                                                    >
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                              <th
                                                                width="40"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://www.tiktok.com/@golecodes"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #007aff;
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://img-cache.net/im/4960397/32fb8fcf2cc04286d7d1556f0f59caa593793220b21086c6f2b55695b579da69.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                        />
                                                                      </a>
                                                                    </td>
                                                                    <td
                                                                      class="nl2go-responsive-hide"
                                                                      width="8"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 1px;
                                                                      "
                                                                    >
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                              <th
                                                                width="40"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://x.com/Manishtamangxyz"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #007aff;
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://img-cache.net/im/4960397/5552a635561d4d09365e834d1b5ca6a83228eb2e312512a614332f72fd0ffeb8.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                        />
                                                                      </a>
                                                                    </td>
                                                                    <td
                                                                      class="nl2go-responsive-hide"
                                                                      width="8"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 1px;
                                                                      "
                                                                    >
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                              <th
                                                                width="40"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://www.facebook.com/manishgoletamang"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #007aff;
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://img-cache.net/im/4960397/71a0680b06c995e6030190a5c9d1420b7c20f80c36597f2144666c2b62a52d60.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                        />
                                                                      </a>
                                                                    </td>
                                                                    <td
                                                                      class="nl2go-responsive-hide"
                                                                      width="8"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 1px;
                                                                      "
                                                                    >
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                              <th
                                                                width="32"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://www.instagram.com/codewithmanish_/"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #007aff;
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://img-cache.net/im/4960397/c2c25c4d2076c7f37112ced457f98550565bdfc92294241b91ec5dff5262f4ac.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                        />
                                                                      </a>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="
                                                font-family: Arial;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <p>
                                                <!-- Unsubscribe text here -->
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
