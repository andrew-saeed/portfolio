import type { APIRoute } from 'astro';
import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from "@getbrevo/brevo"

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiInstance = new TransactionalEmailsApi()
    
    apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      import.meta.env.BREVO_API_KEY || process.env.BREVO_API_KEY
    )

    const { data } = await request.json()

    const htmlContent = `
      <html>
        <body>
          <h2 style="font-size:20px;font-weight:bold;">${data.email}</h2>
          <p style="font-size:18px;">${data.message}</p>
        </body>
      </html>
    `

    const sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail.subject = data.subject
    sendSmtpEmail.sender = { name: 'andrewsaeed.dev', email: 'andrewsaeed95@gmail.com' }
    sendSmtpEmail.htmlContent = htmlContent
    sendSmtpEmail.to = [{ email: 'andrewsaeed95@gmail.com', name: 'andrew saeed' }]

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    return new Response(`mail '${data.subject}' was sent`, { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}