import React from 'react';
import type { Equipment, ReportEvaluations, EvaluationLevel } from '../types';
import { evaluationLevels } from '../constants';
import { PrintIcon, BackIcon, CheckIcon } from './icons';

interface ReportViewProps {
  date: string;
  reportedEquipment: Equipment[];
  line: 1 | 2;
  onBack: () => void;
  generalComments: string;
  onCommentsChange: (comments: string) => void;
  evaluations: ReportEvaluations;
  onEvaluationChange: (category: keyof ReportEvaluations, value: EvaluationLevel) => void;
  technicianName: string;
  onTechnicianNameChange: (name: string) => void;
}

const evaluationCategories: { key: keyof ReportEvaluations; label: string }[] = [
    { key: 'cleaning', label: 'Nivel General de Curățare' },
    { key: 'lubrication', label: 'Nivel General de Gresare' },
    { key: 'operation', label: 'Nivel General de Operare' },
];

const getEvaluationColorClasses = (level: EvaluationLevel) => {
    switch (level) {
        case 'Bun': return 'bg-green-500/20 text-green-300 border-green-500/30 print:bg-green-100 print:text-green-800 print:border-green-300';
        case 'Satisfacator': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 print:bg-yellow-100 print:text-yellow-800 print:border-yellow-300';
        case 'Nesatisfacator': return 'bg-red-500/20 text-red-300 border-red-500/30 print:bg-red-100 print:text-red-800 print:border-red-300';
        default: return 'bg-slate-600 text-slate-300 border-slate-500/30';
    }
}


const ReportView: React.FC<ReportViewProps> = ({ date, reportedEquipment, line, onBack, generalComments, onCommentsChange, evaluations, onEvaluationChange, technicianName, onTechnicianNameChange }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto print:p-0">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-3xl font-bold text-sky-400">Raport Final</h1>
        <div className="flex gap-2">
            <button onClick={onBack} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                <BackIcon className="w-5 h-5"/>
                <span>Înapoi</span>
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                <PrintIcon className="w-5 h-5"/>
                <span>Printează</span>
            </button>
        </div>
      </div>
      
       <div className="mb-6 print:hidden">
        <label htmlFor="technician-name" className="block text-lg font-semibold text-slate-300 mb-2">Nume Tehnician / Tehnicieni</label>
        <input
            id="technician-name"
            type="text"
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            placeholder="Introduceți numele..."
            value={technicianName}
            onChange={(e) => onTechnicianNameChange(e.target.value)}
        />
      </div>

      <div className="mb-6 print:hidden">
        <h2 className="text-lg font-semibold text-slate-300 mb-2">Evaluări Generale</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800 p-4 rounded-lg">
            {evaluationCategories.map(({ key, label }) => (
                <div key={key}>
                    <label htmlFor={`eval-${key}`} className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
                    <select
                        id={`eval-${key}`}
                        value={evaluations[key]}
                        onChange={(e) => onEvaluationChange(key, e.target.value as EvaluationLevel)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                        {evaluationLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
      </div>

      <div className="mb-6 print:hidden">
        <label htmlFor="general-comments" className="block text-lg font-semibold text-slate-300 mb-2">Comentarii Generale Raport</label>
        <textarea
            id="general-comments"
            rows={4}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            placeholder="Adăugați observații sau concluzii generale aici..."
            value={generalComments}
            onChange={(e) => onCommentsChange(e.target.value)}
        />
      </div>

      <div className="bg-slate-800 p-8 rounded-lg shadow-lg print:bg-white print:p-4 print:shadow-none" id="report-content">
        <header className="border-b-2 border-sky-500 pb-4 mb-8 print:border-black">
            <h2 className="text-4xl font-extrabold text-white text-center print:text-black">Raport de Constatare și Mentenanță</h2>
            <div className="flex justify-between text-slate-300 mt-4 print:text-gray-800">
                <span>Data Raport: {date}</span>
                <span>Linia de Sortare: {line}</span>
            </div>
            <div className="flex justify-between text-slate-300 mt-1 print:text-gray-800">
                <span>Emitent: Eco Life Style</span>
                <span>Beneficiar: Green Pack</span>
            </div>
             <div className="text-slate-300 mt-1 print:text-gray-800">
                <span>Nume Tehnician: {technicianName || 'N/A'}</span>
            </div>
        </header>

        <section className="mb-8 p-4 bg-slate-900/50 rounded-md break-inside-avoid print:bg-transparent print:p-0 print:mb-6">
            <h3 className="text-xl font-semibold text-sky-400 mb-4 print:text-black">Evaluări Generale</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {evaluationCategories.map(({key, label}) => (
                      <div key={key} className="bg-slate-700/50 p-4 rounded-lg text-center print:bg-gray-50 print:border print:border-gray-200">
                        <h4 className="font-semibold text-slate-300 mb-2 print:text-gray-600">{label}</h4>
                        <p className={`font-bold text-lg px-4 py-1 rounded-full inline-block border ${getEvaluationColorClasses(evaluations[key])}`}>
                            {evaluations[key]}
                        </p>
                    </div>
                ))}
            </div>
        </section>

        {generalComments && (
            <section className="mb-8 p-4 bg-slate-900/50 rounded-md break-inside-avoid print:bg-gray-50 print:border print:border-gray-200">
                <h3 className="text-xl font-semibold text-sky-400 mb-2 print:text-black">Comentarii Generale</h3>
                <p className="text-slate-200 whitespace-pre-wrap print:text-black">{generalComments}</p>
            </section>
        )}

        <main>
          {reportedEquipment.length === 0 ? (
            <p className="text-center text-slate-400 py-10 print:text-gray-600">Nicio neconformitate sau activitate de mentenanță înregistrată.</p>
          ) : (
            <div className="space-y-10">
              {reportedEquipment.map(equipment => (
                <section key={equipment.id} className="break-inside-avoid">
                  <div className="bg-slate-700 text-sky-300 p-3 rounded-t-md print:bg-gray-100 print:text-black print:border print:border-b-0 print:border-gray-300">
                    <h3 className="text-2xl font-semibold">{equipment.name}</h3>
                  </div>
                  <div className="border border-t-0 border-slate-700 rounded-b-md print:border-gray-300">
                    {equipment.completedMaintenanceTasks && equipment.completedMaintenanceTasks.length > 0 && (
                        <div className="p-4 border-b border-slate-700 print:border-gray-300">
                            <h4 className="font-semibold text-lg text-green-300 mb-2 print:text-green-700 flex items-center gap-2">
                                <CheckIcon className="w-5 h-5"/>
                                Mentenanță preventivă efectuată
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-slate-200 print:text-black pl-4">
                                {equipment.completedMaintenanceTasks.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {equipment.nonConformities.length > 0 ? (
                      equipment.nonConformities.map(finding => (
                        <div key={finding.id} className="p-4 border-b border-slate-700 last:border-b-0 grid grid-cols-1 md:grid-cols-3 gap-6 print:border-gray-300">
                          <div className="md:col-span-1 space-y-4">
                              {finding.photo && <img src={finding.photo} alt="Foto constatare" className="rounded-md object-cover w-full max-h-60" />}
                               <div>
                                  <h4 className="font-bold text-slate-300 print:text-gray-700">Tip Neconformitate:</h4>
                                  <p className="text-slate-200 print:text-black">{finding.type}</p>
                              </div>
                              {finding.discoveryDate && (
                                <div>
                                    <h4 className="font-bold text-slate-300 print:text-gray-700">Data Constatării:</h4>
                                    <p className="text-slate-200 print:text-black">{new Date(finding.discoveryDate).toLocaleDateString('ro-RO')}</p>
                                </div>
                              )}
                              <div>
                                  <h4 className="font-bold text-slate-300 print:text-gray-700">Note:</h4>
                                  <p className="text-slate-200 print:text-black">{finding.notes || 'N/A'}</p>
                              </div>
                          </div>

                          <div className="md:col-span-2 bg-slate-900/50 p-4 rounded-md print:bg-gray-50 print:p-3">
                              <h4 className="text-xl font-bold text-sky-400 mb-3 print:text-black">Recomandare</h4>
                              {finding.recommendation ? (
                                  <div className="space-y-3">
                                      <div>
                                          <strong className="text-slate-400 block print:text-gray-600">Acțiune:</strong>
                                          <p className="text-white text-lg font-semibold bg-sky-800/50 px-2 py-1 rounded print:text-black print:bg-gray-200">{finding.recommendation.action}</p>
                                      </div>
                                      <div>
                                          <strong className="text-slate-400 block print:text-gray-600">Cum:</strong>
                                          <p className="text-white print:text-black">{finding.recommendation.how}</p>
                                      </div>
                                      <div>
                                          <strong className="text-slate-400 block print:text-gray-600">Cu ce:</strong>
                                          <p className="text-white print:text-black">{finding.recommendation.withWhat}</p>
                                      </div>
                                      <div>
                                          <strong className="text-slate-400 block print:text-gray-600">Până când:</strong>
                                          <p className="text-white print:text-black">{finding.recommendation.deadline}</p>
                                      </div>
                                  </div>
                              ) : (
                                  <p className="text-slate-400 print:text-gray-500">Nicio recomandare generată.</p>
                              )}
                          </div>
                        </div>
                      ))
                    ) : (
                        (!equipment.completedMaintenanceTasks || equipment.completedMaintenanceTasks.length === 0) && (
                            <div className="p-4">
                                <p className="text-slate-400 italic print:text-gray-500">Nicio neconformitate sau activitate de mentenanță înregistrată pentru acest echipament.</p>
                            </div>
                        )
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ReportView;