import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [genderTab, setGenderTab] = useState<'men' | 'women'>('men');

  const menSizes = [
    { ukSize: 'UK 36 (XS)', chest: unit === 'inches' ? '36"' : '91 cm', shoulder: unit === 'inches' ? '17.5"' : '44.5 cm', length: unit === 'inches' ? '28.0"' : '71 cm', waist: unit === 'inches' ? '28 - 30"' : '71 - 76 cm' },
    { ukSize: 'UK 38 (S)', chest: unit === 'inches' ? '38"' : '96 cm', shoulder: unit === 'inches' ? '18.2"' : '46 cm', length: unit === 'inches' ? '28.5"' : '72 cm', waist: unit === 'inches' ? '30 - 32"' : '76 - 81 cm' },
    { ukSize: 'UK 40 (M)', chest: unit === 'inches' ? '40"' : '101 cm', shoulder: unit === 'inches' ? '19.0"' : '48 cm', length: unit === 'inches' ? '29.5"' : '75 cm', waist: unit === 'inches' ? '32 - 34"' : '81 - 86 cm' },
    { ukSize: 'UK 42 (L)', chest: unit === 'inches' ? '42"' : '107 cm', shoulder: unit === 'inches' ? '19.8"' : '50 cm', length: unit === 'inches' ? '30.5"' : '77 cm', waist: unit === 'inches' ? '34 - 36"' : '86 - 91 cm' },
    { ukSize: 'UK 44 (XL)', chest: unit === 'inches' ? '44"' : '112 cm', shoulder: unit === 'inches' ? '20.5"' : '52 cm', length: unit === 'inches' ? '31.5"' : '80 cm', waist: unit === 'inches' ? '36 - 38"' : '91 - 96 cm' },
    { ukSize: 'UK 46 (XXL)', chest: unit === 'inches' ? '46"' : '117 cm', shoulder: unit === 'inches' ? '21.2"' : '54 cm', length: unit === 'inches' ? '32.5"' : '82 cm', waist: unit === 'inches' ? '38 - 40"' : '96 - 101 cm' },
  ];

  const womenSizes = [
    { ukSize: 'UK 6 (XS)', bust: unit === 'inches' ? '32"' : '81 cm', waist: unit === 'inches' ? '24 - 25"' : '61 - 64 cm', hips: unit === 'inches' ? '34"' : '86 cm', length: unit === 'inches' ? '25.0"' : '63 cm' },
    { ukSize: 'UK 8 (S)', bust: unit === 'inches' ? '34"' : '86 cm', waist: unit === 'inches' ? '26 - 27"' : '66 - 69 cm', hips: unit === 'inches' ? '36"' : '91 cm', length: unit === 'inches' ? '26.0"' : '66 cm' },
    { ukSize: 'UK 10 (M)', bust: unit === 'inches' ? '36"' : '91 cm', waist: unit === 'inches' ? '28 - 29"' : '71 - 74 cm', hips: unit === 'inches' ? '38"' : '96 cm', length: unit === 'inches' ? '27.0"' : '68 cm' },
    { ukSize: 'UK 12 (L)', bust: unit === 'inches' ? '38"' : '96 cm', waist: unit === 'inches' ? '30 - 31"' : '76 - 79 cm', hips: unit === 'inches' ? '40"' : '101 cm', length: unit === 'inches' ? '28.0"' : '71 cm' },
    { ukSize: 'UK 14 (XL)', bust: unit === 'inches' ? '40"' : '101 cm', waist: unit === 'inches' ? '32 - 33"' : '81 - 84 cm', hips: unit === 'inches' ? '42"' : '106 cm', length: unit === 'inches' ? '29.0"' : '73 cm' },
    { ukSize: 'UK 16 (XXL)', bust: unit === 'inches' ? '42"' : '106 cm', waist: unit === 'inches' ? '34 - 35"' : '86 - 89 cm', hips: unit === 'inches' ? '44"' : '112 cm', length: unit === 'inches' ? '30.0"' : '75 cm' },
  ];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#F15A0A] uppercase">
              BRITISH TAILORING STANDARDS
            </span>
            <h3 className="font-editorial text-lg font-bold uppercase tracking-tight">
              UK SIZE CONVENTIONS & MEASUREMENTS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Gender and Unit Toggles */}
        <div className="flex items-center justify-between py-4">
          <div className="flex rounded-lg bg-neutral-900 p-1 border border-neutral-800">
            <button
              onClick={() => setGenderTab('men')}
              className={`px-3 py-1 rounded-md text-xs font-semibold uppercase ${
                genderTab === 'men' ? 'bg-[#F15A0A] text-white' : 'text-neutral-400'
              }`}
            >
              MEN / UNISEX
            </button>
            <button
              onClick={() => setGenderTab('women')}
              className={`px-3 py-1 rounded-md text-xs font-semibold uppercase ${
                genderTab === 'women' ? 'bg-[#F15A0A] text-white' : 'text-neutral-400'
              }`}
            >
              WOMEN
            </button>
          </div>

          <div className="flex rounded-lg bg-neutral-900 p-1 border border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-md ${
                unit === 'inches' ? 'bg-white text-black font-bold' : 'text-neutral-400'
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-md ${
                unit === 'cm' ? 'bg-white text-black font-bold' : 'text-neutral-400'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">UK Standard</th>
                <th className="py-2.5 px-3">{genderTab === 'men' ? 'Chest' : 'Bust'}</th>
                <th className="py-2.5 px-3">{genderTab === 'men' ? 'Shoulder' : 'Hips'}</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {genderTab === 'men' ? (
                menSizes.map((row) => (
                  <tr key={row.ukSize} className="hover:bg-neutral-900/50">
                    <td className="py-2.5 px-3 font-bold text-white">{row.ukSize}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.chest}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.shoulder}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.waist}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.length}</td>
                  </tr>
                ))
              ) : (
                womenSizes.map((row) => (
                  <tr key={row.ukSize} className="hover:bg-neutral-900/50">
                    <td className="py-2.5 px-3 font-bold text-white">{row.ukSize}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.bust}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.hips}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.waist}</td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">{row.length}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-6 border-t border-neutral-800 mt-4 text-[11px] text-neutral-400 space-y-1">
          <p>• Engineered for a relaxed architectural drape. Choose your standard UK size or size down for tailored proximity.</p>
          <p>• Complimentary prepaid Royal Mail returns within 14 days of delivery across the UK.</p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
