import Link from "next/link";
import { ArrowUpRight, TreePine } from "lucide-react";
import fidanVerisi from "@/data/fidanlar.json";

export default function FidanlarPage() {
  const siraliFidanlar = [...fidanVerisi].sort((a, b) => a.fidan_no - b.fidan_no);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:mb-8 sm:flex-row sm:items-end sm:p-8">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Dijital Fidanlik Arsivi
            </p>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
              Tum fidanlar
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Her kayit, bir fidanin kampuste biraktigi izin dijital kimligidir.
              Dilerseniz QR kodu ile dogrudan fidan profiline de ulasabilirsiniz.
            </p>
          </div>
          <Link
            href="/"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:w-auto"
          >
            Ana sayfaya don
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siraliFidanlar.map((fidan) => (
            <Link
              key={fidan.id}
              href={`/fidan/${fidan.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  Fidan #{fidan.fidan_no}
                </span>
                <TreePine className="h-4 w-4 text-emerald-600" />
              </div>
              <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
                {fidan.diken_adi}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{fidan.agac_turu}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                Profili ac
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
