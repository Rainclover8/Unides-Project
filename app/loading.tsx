export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/90 p-7 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
          <div className="loader-orbit" />
        </div>
        <h2 className="text-lg font-semibold text-slate-100">Fidanlik yukleniyor</h2>
        <p className="mt-2 text-sm text-slate-400">
          Baglantiya gore birkac saniye surebilir, lutfen bekleyin.
        </p>
      </div>
    </main>
  );
}
