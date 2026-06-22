import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  QrCode,
  School,
  Sprout,
  TreePine,
} from "lucide-react";
import fidanVerisi from "@/data/fidanlar.json";

export default function Home() {
  const toplamFidan = 150;
  const toplamQRliFidan = fidanVerisi.length;
  const qrliFidanlar = [...fidanVerisi]
    .sort((a, b) => b.fidan_no - a.fidan_no)
    .slice(0, 6);

  return (
    <main className="min-h-screen overflow-x-hidden bg-linear-to-b from-slate-50 via-white to-emerald-50/60 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.2),transparent_35%)]" />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12 md:gap-10 md:py-20">
        <div className="surface-3d animate-fade-up grid gap-6 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-8 md:grid-cols-[1.4fr_1fr] md:gap-8 md:p-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 animate-subtle-pulse">
              <School className="h-4 w-4" />
              SUBU Hendek MYO - Dijital Fidanlik
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Kampus fidanlarinin dijital arsivi
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg">
              Her fidanin hikayesini, dikim bilgilerini ve QR ile ulasilabilen profil
              sayfasini tek bir platformda sunuyoruz.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link
                href="/fidanlar"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-auto"
              >
                Fidanlari Goruntule
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="surface-3d rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-2 inline-flex rounded-xl bg-white p-2 text-emerald-600 shadow-sm">
                <TreePine className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-slate-900">{toplamFidan}</div>
              <p className="mt-1 text-sm text-slate-600">Kayitli fidan sayisi</p>
            </div>
            <div className="surface-3d rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-2 inline-flex rounded-xl bg-white p-2 text-blue-600 shadow-sm">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-slate-900">{toplamQRliFidan}</div>
              <p className="mt-1 text-sm text-slate-600">QR hazir fidan profili</p>
            </div>
            <div className="surface-3d rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2 md:col-span-1">
              <div className="mb-2 inline-flex rounded-xl bg-white p-2 text-purple-600 shadow-sm">
                <Leaf className="h-5 w-5" />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Fidan sayfalari mobil uyumlu olarak tasarlandi; ziyaretciler QR okutunca
                dogrudan ilgili fidana ulasabilir.
              </p>
            </div>
          </div>
        </div>

        <section className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Guncel QRli Fidanlar</h2>
              <p className="mt-1 text-sm text-slate-600">
                En son eklenen fidan profillerine tek tikla ulasin.
              </p>
            </div>
            <Link
              href="/fidanlar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
            >
              Tumunu Gor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qrliFidanlar.map((fidan) => (
              <Link
                key={fidan.id}
                href={`/fidan/${fidan.id}`}
                className="surface-3d group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-white hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                    Fidan #{fidan.fidan_no}
                  </span>
                  <Sprout className="h-4 w-4 text-emerald-600" />
                </div>
                <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
                  {fidan.diken_adi}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{fidan.agac_turu}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  QR profiline git
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}