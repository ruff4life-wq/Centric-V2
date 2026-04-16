// Feedback submission via Resend raw fetch
// Mirrors the pattern already used in Premier Secure AI intake

export interface FeedbackPayload {
  rating: number;
  comment: string;
  userName: string;
  currentWeek: number;
  cycle: number;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<{ ok: boolean; error?: string }> {
  const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('VITE_RESEND_API_KEY not set');
    return { ok: false, error: 'Configuration error' };
  }

  const stars = '★'.repeat(payload.rating) + '☆'.repeat(5 - payload.rating);
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3a2018;">
      <div style="background: #4a2e24; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h2 style="color: #fff; margin: 0; font-size: 20px;">Centric App Feedback</h2>
        <p style="color: #c4a078; margin: 4px 0 0; font-size: 13px;">AGC Wellness Companion</p>
      </div>
      <div style="background: #fff; padding: 28px 32px; border: 1px solid #ead5c8; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #9a7a6a; font-size: 13px; width: 120px;">From</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${payload.userName || 'Anonymous'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a7a6a; font-size: 13px;">Progress</td>
            <td style="padding: 8px 0; font-size: 14px;">Cycle ${payload.cycle}, Week ${payload.currentWeek}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a7a6a; font-size: 13px;">Rating</td>
            <td style="padding: 8px 0; font-size: 20px; color: #c0736a; letter-spacing: 2px;">${stars}</td>
          </tr>
        </table>
        ${payload.comment ? `
        <div style="background: #faf4f0; border-left: 3px solid #c0736a; padding: 16px 20px; border-radius: 4px; margin-top: 4px;">
          <p style="color: #6b4a3a; font-size: 13px; margin: 0 0 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Comment</p>
          <p style="color: #3a2018; font-size: 15px; margin: 0; line-height: 1.6;">${payload.comment}</p>
        </div>
        ` : '<p style="color: #9a7a6a; font-style: italic; font-size: 14px;">No comment provided.</p>'}
        <p style="color: #c0a88a; font-size: 12px; margin-top: 24px; border-top: 1px solid #ead5c8; padding-top: 16px;">
          Submitted ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Centric Feedback <info@premiersecureai.com>',
        to: ['marvin_ruff@premiersecureai.com'],
        subject: `Centric Feedback — ${stars} from ${payload.userName || 'a user'}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Resend error:', err);
      return { ok: false, error: err.message || 'Send failed' };
    }

    return { ok: true };
  } catch (e) {
    console.error('Feedback submit error:', e);
    return { ok: false, error: 'Network error' };
  }
}
