'use client';
import { QRCodeSVG } from 'qrcode.react';
import fidanVerisi from '@/data/fidanlar.json';
import { useEffect, useState, useRef } from 'react';
import { Download, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

// SADECE SENİN BİLECEĞİN GİRİŞ KODU
const ADMIN_ACCESS_CODE = "1923"; 

export default function AdminControlPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [accessError, setAccessError] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Güvenlik Kodu Kontrolü
  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode === ADMIN_ACCESS_CODE) {
      setIsAuthenticated(true);
      setAccessError(false);
    } else {
      setAccessError(true);
      setEnteredCode('');
      codeInputRef.current?.focus();
    }
  };

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

  // --- GİRİŞ EKRANI (GÜVENLİK) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
        <form onSubmit={handleAccessSubmit} className="bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-slate-700">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold mb-3">Admin Erişimi</h1>
          <p className="text-slate-400 mb-8 text-sm">QR Kod Üretim Paneline erişmek için lütfen 4 haneli kodu giriniz.</p>
          
          <input 
            type="password"
            maxLength={4}
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            ref={codeInputRef}
            placeholder="****"
            className="w-full text-center text-4xl font-bold tracking-[1em] bg-slate-700 border-2 border-slate-600 focus:border-blue-500 focus:ring-0 rounded-xl py-3 mb-6 transition outline-none"
            autoFocus
          />

          {accessError && (
            <div className="flex items-center gap-2 justify-center text-red-400 mb-6 bg-red-950 p-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4" />
              Kodu yanlış girdiniz, lütfen tekrar deneyin.
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition">
            Paneli Aç
          </button>
        </form>
      </div>
    );
  }

  // --- ASIL ADMİN PANELİ ---
  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="mb-12 max-w-5xl mx-auto flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2 text-slate-950">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
            3D Baskı QR Kod Yönetim Merkezi
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl">
            Sisteminizde {fidanVerisi.length} fidan kayıtlıdır. Bütün QR kodları 3D modelleme programları için vektörel SVG formatında indirebilirsiniz.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-425 mx-auto">
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