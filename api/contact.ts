import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido'
      });
    }

    // Verify API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return res.status(500).json({
        error: 'Servicio de email no configurado'
      });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'TukiCode <onboarding@resend.dev>',
      to: ['jjulian.contrerass@gmail.com'],
      replyTo: email,
      subject: `Nuevo mensaje de ${name} - TukiCode`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: 600;
                color: #667eea;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 15px;
                border-radius: 5px;
                border-left: 3px solid #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🚀 Nuevo Mensaje - TukiCode</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nombre:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">💬 Mensaje:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de TukiCode</p>
              <p>Puedes responder directamente a este email para contactar al cliente</p>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      message: 'Email enviado exitosamente',
      data
    });
  } catch (error) {
    console.error('Error al enviar email:', error);
    return res.status(500).json({
      error: 'Error al enviar el mensaje. Por favor intenta de nuevo.'
    });
  }
}
