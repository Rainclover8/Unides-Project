import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin_session';

function sha256(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

function normalizeAccessCode(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, '')
    .trim()
    .toLowerCase();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const providedCode = typeof body?.code === 'string' ? body.code : '';
  const expectedCode = process.env.ADMIN_ACCESS_CODE ?? '';

  if (!expectedCode || !providedCode) {
    return NextResponse.json(
      { ok: false, reason: 'missing_code_or_env' },
      { status: 401 }
    );
  }

  const normalizedProvided = normalizeAccessCode(providedCode);
  const normalizedExpected = normalizeAccessCode(expectedCode);
  const providedHash = Buffer.from(sha256(normalizedProvided), 'utf8');
  const expectedHash = Buffer.from(sha256(normalizedExpected), 'utf8');

  if (!timingSafeEqual(providedHash, expectedHash)) {
    return NextResponse.json({ ok: false, reason: 'invalid_code' }, { status: 401 });
  }

  const token = process.env.ADMIN_SESSION_TOKEN ?? '';
  if (!token) {
    return NextResponse.json(
      { ok: false, reason: 'missing_session_token' },
      { status: 500 }
    );
  }
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
