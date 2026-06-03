import { NextResponse } from 'next/server';

import { siteConfig } from '@/config/site';
import { resend } from '@/lib/resend';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? siteConfig.email;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body as {
      name: string;
      email: string;
      phone: string;
      message: string;
    };

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' },
        { status: 400 },
      );
    }

    // Send email to admin
    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Liên hệ] Tin nhắn mới từ ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FAF6F0; border-radius: 12px;">
          <h2 style="color: #14301D; margin-bottom: 4px;">Tin nhắn mới từ website</h2>
          <p style="color: #888; font-size: 13px; margin-top: 0;">Được gửi qua form liên hệ ${siteConfig.name}</p>
          <hr style="border: none; border-top: 1px solid #E8DCC4; margin: 20px 0;" />
          <table style="width: 100%; font-size: 14px; color: #333;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #B2905A; width: 130px; vertical-align: top;">Họ và tên:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #B2905A; vertical-align: top;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #14301D;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #B2905A; vertical-align: top;">Số điện thoại:</td>
              <td style="padding: 8px 0;">${phone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #B2905A; vertical-align: top;">Nội dung:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #E8DCC4; margin: 20px 0;" />
          <p style="font-size: 11px; color: #aaa; text-align: center;">
            Email này được gửi tự động từ <strong>${siteConfig.name}</strong>. Bạn có thể trả lời trực tiếp email này để liên hệ khách hàng.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Không thể gửi email. Vui lòng thử lại sau.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 },
    );
  }
}
