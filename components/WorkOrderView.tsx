import React, { useMemo } from 'react';
import type { ScheduledTask } from '../types';
import { PrintIcon, BackIcon } from './icons';

interface WorkOrderViewProps {
  date: string;
  scheduledTasks: ScheduledTask[];
  line: 1 | 2;
  onBack: () => void;
  technicianName: string;
  onTechnicianNameChange: (name: string) => void;
}

const WorkOrderView: React.FC<WorkOrderViewProps> = ({ date, scheduledTasks, line, onBack, technicianName, onTechnicianNameChange }) => {
  const tasksByEquipment = useMemo(() => {
    return scheduledTasks.reduce((acc, scheduledTask) => {
      if (!acc[scheduledTask.equipmentName]) {
        acc[scheduledTask.equipmentName] = [];
      }
      acc[scheduledTask.equipmentName].push(scheduledTask);
      return acc;
    }, {} as Record<string, ScheduledTask[]>);
  }, [scheduledTasks]);
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto print:p-0">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-3xl font-bold text-sky-400">Ordin de Lucru</h1>
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
        <label htmlFor="technician-name-wo" className="block text-lg font-semibold text-slate-300 mb-2">Nume Tehnician / Tehnicieni</label>
        <input
            id="technician-name-wo"
            type="text"
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            placeholder="Introduceți numele..."
            value={technicianName}
            onChange={(e) => onTechnicianNameChange(e.target.value)}
        />
      </div>

      <div className="bg-slate-800 p-8 rounded-lg shadow-lg print:bg-white print:p-4 print:shadow-none" id="work-order-content">
        <header className="border-b-2 border-sky-500 pb-4 mb-8 print:border-black">
            <h2 className="text-4xl font-extrabold text-white text-center print:text-black">Ordin de Lucru - Mentenanță Preventivă</h2>
            <div className="flex justify-between text-slate-300 mt-4 print:text-gray-800">
                <span>Data: {date}</span>
                <span>Linia de Sortare: {line}</span>
            </div>
            <div className="text-slate-300 mt-1 print:text-gray-800">
                <span>Nume Tehnician: {technicianName || '__________________'}</span>
            </div>
        </header>

        <main>
          {scheduledTasks.length === 0 ? (
            <p className="text-center text-slate-400 py-10 print:text-gray-600">Nicio activitate de mentenanță programată.</p>
          ) : (
            <div className="space-y-8">
              {Object.entries(tasksByEquipment).map(([equipmentName, tasks]) => (
                <section key={equipmentName} className="break-inside-avoid">
                  <div className="bg-slate-700 text-sky-300 p-3 rounded-t-md print:bg-gray-100 print:text-black print:border print:border-b-0 print:border-gray-300">
                    <h3 className="text-2xl font-semibold">{equipmentName}</h3>
                  </div>
                  <div className="border border-t-0 border-slate-700 rounded-b-md print:border-gray-300">
                    <ul className="divide-y divide-slate-700 print:divide-gray-300">
                      {tasks.map((scheduledTask, index) => (
                         <li key={index} className="flex items-start gap-4 p-4">
                            <div className="w-6 h-6 border-2 border-slate-500 print:border-black mt-1 flex-shrink-0"></div>
                            <div className="flex-1">
                                <p className="text-slate-200 print:text-black">{scheduledTask.task.description}</p>
                                <p className="text-sm text-teal-400 print:text-teal-600 font-semibold">
                                    Frecvență: {scheduledTask.task.frequency} ore | Urmează în: {scheduledTask.hoursUntilDue} ore
                                </p>
                            </div>
                         </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
        
        <footer className="mt-20 pt-10 border-t-2 border-slate-600 print:border-t-2 print:border-black text-slate-300 print:text-black break-inside-avoid">
            <div className="grid grid-cols-2 gap-x-12">
                {/* Executed Section */}
                <div>
                    <h4 className="text-lg font-bold mb-4">Executat,</h4>
                    <div className="mt-16">
                        <p className="text-sm text-slate-400 print:text-gray-600">Nume și Prenume:</p>
                        <div className="h-8 border-b border-slate-500 print:border-black"></div>
                    </div>
                    <div className="mt-12">
                         <p className="text-sm text-slate-400 print:text-gray-600">Semnătura:</p>
                        <div className="h-8 border-b border-slate-500 print:border-black"></div>
                    </div>
                </div>
                {/* Verified Section */}
                <div>
                    <h4 className="text-lg font-bold mb-4">Verificat,</h4>
                    <div className="mt-16">
                        <p className="text-sm text-slate-400 print:text-gray-600">Nume și Prenume:</p>
                        <div className="h-8 border-b border-slate-500 print:border-black"></div>
                    </div>
                    <div className="mt-12">
                         <p className="text-sm text-slate-400 print:text-gray-600">Semnătura:</p>
                        <div className="h-8 border-b border-slate-500 print:border-black"></div>
                    </div>
                </div>
            </div>
        </footer>

      </div>
    </div>
  );
};

export default WorkOrderView;
