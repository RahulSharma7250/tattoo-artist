import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

/**
 * POST /api/send-email
 * Body (JSON):
 *   firstName     (required)
 *   lastName      (required)
 *   email         (required)
 *   phone
 *   tattooStyle
 *   description   (required)
 */
export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone = "Not provided",
      tattooStyle = "Not specified",
      description,
    } = await req.json()

    if (!firstName || !lastName || !email || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    /* -------------------------------------------------------------------- */
    /*  Send mail with Resend                                               */
    /* -------------------------------------------------------------------- */
    const resend = new Resend(process.env.RESEND_API_KEY!)
    await resend.emails.send({
      from: "Red Ritual Ink <noreply@redritual.ink>",
      to: [process.env.CONTACT_EMAIL ?? email],
      subject: `New Consultation - ${firstName} ${lastName}`,
      html: emailTemplate({ firstName, lastName, email, phone, tattooStyle, description }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Email error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

/* ------------------------------------------------------------------------ */
/*  Tiny helper to keep the handler tidy                                    */
/* ------------------------------------------------------------------------ */
function emailTemplate({
  firstName,
  lastName,
  email,
  phone,
  tattooStyle,
  description,
}: {
  firstName: string
  lastName: string
  email: string
  phone: string
  tattooStyle: string
  description: string
}) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#000;color:#fff;padding:24px;max-width:640px">
    <h1 style="color:#dc2626;margin:0 0 24px">Red Ritual Ink – Consultation Request</h1>
    <table style="width:100%;font-size:14px;margin-bottom:24px">
      <tr><td><strong>Name:</strong></td><td>${firstName} ${lastName}</td></tr>
      <tr><td><strong>Email:</strong></td><td><a href="mailto:${email}" style="color:#dc2626">${email}</a></td></tr>
      <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Style:</strong></td><td>${tattooStyle}</td></tr>
    </table>
    <h2 style="color:#dc2626;margin:0 0 8px">Description</h2>
    <p style="white-space:pre-wrap;line-height:1.5">${description}</p>
    <hr style="border:none;border-top:1px solid #333;margin:32px 0">
    <p style="font-size:12px;color:#777">
      This email was generated from the Red Ritual Ink contact form.
    </p>
  </div>`
}
