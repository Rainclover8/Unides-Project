'use client';
import { QRCodeSVG } from 'qrcode.react'; // Canvas yerine SVG kullanıyoruz
import fidanVerisi from '@/data/fidanlar.json';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function DownloadQRsPage() {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // SVG'yi bilgisayara indirme fonksiyonu
  const handleDownloadSVG = (fidanId: string, fidanNo: number) => {
    const svgElement = document.getElementById(`qr-${fidanId}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fidan_${fidanNo}_qr.svg`; // Örn: fidan_1_qr.svg olarak iner
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!baseUrl) return null;

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">3D Baskı İçin QR Kod İndirme Merkezi</h1>
        <p className="text-slate-600">
          QR kodları 3D modelleme programlarına (Fusion 360 vb.) aktarmak için <strong>SVG</strong> formatında indirebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {fidanVerisi.map((fidan) => {
          const fidatProfilUrl = `${baseUrl}/fidan/${fidan.id}`;

          return (
            <div key={fidan.id} className="bg-white border border-slate-200 p-6 flex flex-col items-center justify-between text-center rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="font-extrabold text-2xl text-slate-800 block mb-1">
                  #{fidan.fidan_no}
                </span>
                <span className="text-sm font-medium text-slate-500 mb-4 block truncate px-2">
                  {fidan.diken_adi}
                </span>
              </div>
              
              {/* QR Kod (SVG Formatında) */}
              <div className="p-3 bg-white border-2 border-slate-100 rounded-xl mb-4">
                <QRCodeSVG 
                  id={`qr-${fidan.id}`} // İndirme fonksiyonu bu ID'yi bulacak
                  value={fidatProfilUrl}
                  size={150}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"} // Hata payı yüksek, 3D baskıda ufak hatalar tolere edilir
                  includeMargin={false}
                />
              </div>
              
              {/* İndirme Butonu */}
              <button 
                onClick={() => handleDownloadSVG(fidan.id, fidan.fidan_no)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                SVG Olarak İndir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}