import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin_session';

function sha256(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const providedCode = typeof body?.code === 'string' ? body.code.trim() : '';
  const expectedCode = process.env.ADMIN_ACCESS_CODE ?? '';

  if (!expectedCode || !providedCode) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const providedHash = Buffer.from(sha256(providedCode), 'utf8');
  const expectedHash = Buffer.from(sha256(expectedCode), 'utf8');

  if (!timingSafeEqual(providedHash, expectedHash)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = process.env.ADMIN_SESSION_TOKEN ?? 'local-dev-admin-session';
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}
