import fidanVerisi from '@/data/fidanlar.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, TreePine, Heart } from 'lucide-react';

export function generateStaticParams() {
  return fidanVerisi.map((fidan) => ({
    id: fidan.id,
  }));
}

// DİKKAT: Buradaki params kısmı Promise olarak güncellendi (Next.js 15 Kuralı)
export default async function FidanPage({ params }: { params: Promise<{ id: string }> }) {
  
  // URL'den gelen ID'yi asenkron olarak bekleyip alıyoruz
  const resolvedParams = await params;
  const fidan = fidanVerisi.find((f) => f.id === resolvedParams.id);

  if (!fidan) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 flex justify-center items-start md:items-center">
      <div className="w-full max-w-xl bg-white rounded-4xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Fotoğraf Alanı */}
        <div className="relative h-72 md:h-96 w-full">
          <Image 
            src={fidan.foto_url ? fidan.foto_url : 'Görsel Bulunamadı'} 
            alt={`${fidan.diken_adi} fidanı`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-sm">
            <span className="text-sm font-bold text-slate-700">No: {fidan.fidan_no}</span>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-purple-500" fill="currentColor" />
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
              Geleceğe Nefes
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">
            Bu fidan <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{fidan.diken_adi}</span> tarafından hayata kazandırıldı.
          </h1>
          
          {fidan.mesaj && (
            <p className="text-slate-500 italic mt-4 mb-8 text-lg border-l-4 border-blue-200 pl-4">
              "{fidan.mesaj}"
            </p>
          )}

          {/* Bilgi Kartları */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
              <TreePine className="w-6 h-6 text-blue-500" />
              <div className="text-xs text-slate-400 font-medium">AĞAÇ TÜRÜ</div>
              <div className="text-base font-bold text-slate-700">{fidan.agac_turu}</div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              <div className="text-xs text-slate-400 font-medium">DİKİM TARİHİ</div>
              <div className="text-base font-bold text-slate-700">{fidan.dikim_tarihi}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}