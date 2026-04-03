import { Leaf } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 max-w-2xl">
        <div className="w-20 h-20 bg-linear-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg transform -rotate-6">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
          Dijital Fidanlık
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-8 leading-relaxed">
          Kampüsümüze dikilen fidanların dijital izlerini sürüyoruz. Her ağaç, geleceğe bırakılan bir mirastır.
        </p>
        
        <div className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-semibold rounded-full shadow-md hover:bg-slate-700 transition duration-300">
          Kayıtlı Fidan Sayısı: 150
        </div>
      </div>
    </main>
  );
}