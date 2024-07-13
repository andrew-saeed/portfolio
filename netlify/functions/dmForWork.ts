import type { Config } from "@netlify/functions"

import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from "@getbrevo/brevo"

export default async (req: Request) => {

  const apiInstance = new TransactionalEmailsApi()
  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  )

  const { data } = await req.json()

  const htmlContent = `<html>
    <body>
      <h2 style="font-size:20px;font-weight:bold;">${data.email}</h2>
      <p style="font-size:18px;">${data.message}</p>
    </body>
  </html>`

  const sendSmtpEmail = new SendSmtpEmail()
  sendSmtpEmail.subject = data.subject
  sendSmtpEmail.sender = {name: 'MailClient', email: 'MailClient@mail.com'}
  sendSmtpEmail.htmlContent = htmlContent
  sendSmtpEmail.to = [{'email': 'andrewsaeed95@gmail.com', 'name': 'andrew saeed'}]

  await apiInstance.sendTransacEmail(sendSmtpEmail)

  return new Response(`mail '${data.subject}' was sent`)
}

export const config: Config = {
  path: "/dm-for-work"
}