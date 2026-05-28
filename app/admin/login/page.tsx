'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      window.location.href = '/admin/print-qrs';
      return;
    }

    setPending(false);
    setCode('');
    setError('Kod hatali. Lutfen tekrar deneyin.');
  };

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 text-slate-100 sm:px-6">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-md items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-2xl sm:p-8"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-700 bg-blue-500 shadow-lg">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-center text-2xl font-extrabold">Admin Erisimi</h1>
          <p className="mt-2 text-center text-sm text-slate-400">
            QR yonetim paneline devam etmek icin erisim kodunu giriniz.
          </p>

          <input
            type="password"
            name="code"
            maxLength={16}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Erisim kodu"
            className="mt-6 w-full rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 text-base outline-none transition focus:border-blue-500"
            autoFocus
          />

          {error ? (
            <p className="mt-3 rounded-lg bg-red-950/70 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending || !code.trim()}
            className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'Kontrol ediliyor...' : 'Panele gir'}
          </button>
        </form>
      </div>
    </main>
  );
}
