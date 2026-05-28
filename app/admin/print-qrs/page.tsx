'use client';
import { QRCodeSVG } from 'qrcode.react';
import fidanVerisi from '@/data/fidanlar.json';
import { useMemo } from 'react';
import Link from 'next/link';
import { Download, CheckCircle2, LogOut } from 'lucide-react';

export default function AdminControlPage() {
  const baseUrl = useMemo(
    () =>
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || '',
    []
  );

  // SVG'yi bilgisayara indirme (3D Baskı İçin)
  const handleDownloadSVG = (fidanId: string, fidanNo: number) => {
    const svgElement = document.getElementById(`qr-svg-${fidanId}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fidan_${fidanNo}_qr_3d.svg`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!baseUrl) return null;

  // --- ASIL ADMİN PANELİ ---
  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="mb-8 sm:mb-12 max-w-5xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <Link className="text-3xl font-bold mb-1 flex items-center gap-2 text-slate-950" href='/'>
            <CheckCircle2 className="w-7 h-7 text-green-500" />
            3D Baskı QR Kod Yönetim Merkezi
          </Link>
          <p className="text-slate-600 text-sm max-w-2xl">
            Sisteminizde {fidanVerisi.length} fidan kayıtlıdır. Bütün QR kodları 3D modelleme programları için vektörel SVG formatında indirebilirsiniz.
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut className="w-4 h-4" />
            Cikis yap
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-425 mx-auto">
        {fidanVerisi.map((fidan) => {
          const fidatProfilUrl = `${baseUrl}/fidan/${fidan.id}`;

          return (
            <div key={fidan.id} className="bg-white border border-slate-100 p-6 flex flex-col items-center justify-between text-center rounded-2xl shadow-sm group hover:shadow-lg hover:border-blue-100 transition-all overflow-x-hidden">
              <div className="mb-4">
                <span className="font-extrabold text-2xl text-slate-900 block leading-none">
                  #{fidan.fidan_no}
                </span>
                <span className="text-xs font-semibold text-slate-400 block truncate px-2 mt-1">
                  {fidan.diken_adi}
                </span>
              </div>
              
              <div className="flex flex-col gap-5 items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl mb-5 w-full">
                {/* SVG QR KOD (3D Baskı İndirme İçin) */}
                <QRCodeSVG 
                  id={`qr-svg-${fidan.id}`} 
                  value={fidatProfilUrl} 
                  size={150} 
                  bgColor={"#ffffff"} 
                  fgColor={"#000000"} 
                  level={"H"} 
                  includeMargin={false}
                />
              </div>
              
              {/* İndirme Butonu */}
              <button 
                onClick={() => handleDownloadSVG(fidan.id, fidan.fidan_no)} 
                className="w-full flex items-center justify-center gap-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 py-3 rounded-lg font-bold transition"
              >
                <Download className="w-4 h-4" /> SVG İndir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}