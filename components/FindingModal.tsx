import React, { useState, useCallback, useMemo } from 'react';
import type { Equipment, NonConformity, Recommendation } from '../types';
import { NON_CONFORMITIES_BY_TYPE } from '../constants';
import { generateRecommendation } from '../services/geminiService';
import { CameraIcon, SparklesIcon, TrashIcon } from './icons';
import Spinner from './Spinner';

interface FindingModalProps {
  equipment: Equipment;
  findingToEdit?: NonConformity | null;
  onClose: () => void;
  onSave: (equipmentId: string, finding: NonConformity) => void;
}

const FindingModal: React.FC<FindingModalProps> = ({ equipment, findingToEdit, onClose, onSave }) => {
  const availableNonConformities = useMemo(() => {
    return NON_CONFORMITIES_BY_TYPE[equipment.equipmentType] || [];
  }, [equipment.equipmentType]);

  const placeholderText = 'Selectați tipul neconformității';

  const [type, setType] = useState<string>(findingToEdit?.type || placeholderText);
  const [notes, setNotes] = useState<string>(findingToEdit?.notes || '');
  const [photo, setPhoto] = useState<string | undefined>(findingToEdit?.photo);
  const [discoveryDate, setDiscoveryDate] = useState<string>(findingToEdit?.discoveryDate || '');
  const [recommendation, setRecommendation] = useState<Recommendation | undefined>(findingToEdit?.recommendation);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateRecommendation = useCallback(async () => {
    if (type === placeholderText) {
        setError('Vă rugăm selectați un tip de neconformitate.');
        return;
    }
    setError('');
    setIsGenerating(true);
    const result = await generateRecommendation(equipment.name, type);
    if (result) {
      setRecommendation(result);
    }
    setIsGenerating(false);
  }, [equipment.name, type]);

  const handleSave = () => {
    if (type === placeholderText) {
      setError('Vă rugăm selectați un tip de neconformitate înainte de a salva.');
      return;
    }
    const findingData: NonConformity = {
      id: findingToEdit?.id || `nc-${Date.now()}`,
      type,
      notes,
      photo,
      discoveryDate,
      recommendation,
    };
    onSave(equipment.id, findingData);
    onClose();
  };
  
  const handleRecommendationChange = <K extends keyof Recommendation>(field: K, value: string) => {
    setRecommendation(prev => prev ? { ...prev, [field]: value } : undefined);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-sky-400 mb-1">{findingToEdit ? 'Editează' : 'Adaugă'} Neconformitate</h2>
          <p className="text-slate-400 mb-6">{equipment.name} <span className="text-xs bg-slate-700 px-2 py-1 rounded-full ml-2 align-middle">{equipment.equipmentType}</span></p>

          {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tip Neconformitate</label>
              <select
                value={type}
                onChange={(e) => { setType(e.target.value); setError(''); }}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value={placeholderText} disabled>{placeholderText}</option>
                {availableNonConformities.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Note (Opțional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Descrieți problema în detaliu..."
              />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Data Constatării (Opțional)</label>
                <input
                    type="date"
                    value={discoveryDate}
                    onChange={(e) => setDiscoveryDate(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Fotografie (Opțional)</label>
              <div className="mt-2 flex items-center gap-4">
                  <label htmlFor="file-upload" className="cursor-pointer bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md inline-flex items-center gap-2">
                      <CameraIcon className="w-5 h-5" />
                      <span>Încarcă Imagine</span>
                  </label>
                  <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                  {photo && (
                       <div className="relative">
                           <img src={photo} alt="Previzualizare" className="h-20 w-20 object-cover rounded-md" />
                           <button onClick={() => setPhoto(undefined)} className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white hover:bg-red-500">
                             <TrashIcon className="w-4 h-4" />
                           </button>
                       </div>
                  )}
              </div>
            </div>

            <div className="border-t border-slate-700 pt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-sky-400">Recomandare Remediere</h3>
                    <button
                        onClick={handleGenerateRecommendation}
                        disabled={isGenerating || type === placeholderText}
                        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                        {isGenerating ? <Spinner /> : <SparklesIcon className="w-5 h-5" />}
                        <span>Generează cu AI</span>
                    </button>
                </div>
                {recommendation && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Cum?</label>
                            <textarea value={recommendation.how} onChange={(e) => handleRecommendationChange('how', e.target.value)} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Cu ce?</label>
                            <textarea value={recommendation.withWhat} onChange={(e) => handleRecommendationChange('withWhat', e.target.value)} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Până când?</label>
                            <input type="text" value={recommendation.deadline} onChange={(e) => handleRecommendationChange('deadline', e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Acțiune</label>
                            <input type="text" value={recommendation.action} onChange={(e) => handleRecommendationChange('action', e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"/>
                        </div>
                    </div>
                )}
            </div>

          </div>
        </div>
        <div className="bg-slate-900 px-6 py-4 flex justify-end gap-4 sticky bottom-0">
          <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md">Anulează</button>
          <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md">Salvează</button>
        </div>
      </div>
    </div>
  );
};

export default FindingModal;
