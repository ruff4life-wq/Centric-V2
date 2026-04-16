export interface FeedbackPayload {
  rating: number;
  comment: string;
  userName: string;
  currentWeek: number;
  cycle: number;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      return { ok: false, error: err.error || 'Send failed' };
    }

    return { ok: true };
  } catch (e) {
    console.error('Feedback submit error:', e);
    return { ok: false, error: 'Network error' };
  }
}