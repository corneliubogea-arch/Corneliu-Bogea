import React, { useState } from 'react';
import type { WorkOrder, TaskStatus } from '../types';
import { BackIcon } from './icons';

const statusTextColors: Record<TaskStatus, string> = {
    'Nefinalizat': 'text-slate-300',
    'În desfășurare': 'text-yellow-300',
    'Finalizat': 'text-green-300',
    'Amânat': 'text-red-300',
};
const statusBgColors: Record<TaskStatus, string> = {
    'Nefinalizat': 'bg-slate-500/20',
    'În desfășurare': 'bg-yellow-500/20',
    'Finalizat': 'bg-green-500/20',
    'Amânat': 'bg-red-500/20',
};


const WorkOrderArchive: React.FC<{ archive: WorkOrder[], onBack: () => void }> = ({ archive, onBack }) => {
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedOrderId(prevId => (prevId === id ? null : id));
    };
    
    const formatTime = (timestamp?: number) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-sky-400">Arhivă Ordine de Lucru</h1>
                <button onClick={onBack} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                    <BackIcon className="w-5 h-5"/>
                    <span>Acasă</span>
                </button>
            </header>

            {archive.length === 0 ? (
                <div className="text-center py-20 bg-slate-800 rounded-lg">
                    <p className="text-slate-400 text-xl">Arhiva este goală.</p>
                    <p className="text-slate-500 mt-2">Ordinele de lucru salvate vor apărea aici.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {archive.slice().reverse().map(wo => (
                        <div key={wo.id} className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50" onClick={() => toggleExpand(wo.id)}>
                                <div>
                                    <h2 className="font-bold text-xl text-sky-300">{wo.id}</h2>
                                    <p className="text-sm text-slate-400">Data: {wo.date} | Linia: {wo.line} | Tehnician: {wo.technicianName || 'Nespecificat'}</p>
                                </div>
                                <span className={`transform transition-transform duration-200 ${expandedOrderId === wo.id ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                            </div>
                            {expandedOrderId === wo.id && (
                                <div className="p-4 bg-slate-900/50 border-t border-slate-700">
                                    <h3 className="text-lg font-semibold mb-3 text-slate-200">Detalii Activități</h3>
                                    <div className="space-y-4">
                                        {wo.tasks.map(task => (
                                            <div key={task.id} className="p-3 bg-slate-800/70 rounded-md">
                                                <div className="flex justify-between items-start">
                                                    <p className="flex-1 font-medium text-slate-300">{task.task.description}</p>
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusBgColors[task.status]} ${statusTextColors[task.status]}`}>{task.status}</span>
                                                </div>
                                                <div className="text-xs text-slate-400 mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <div>
                                                        <strong>Echipament:</strong> {task.equipmentName}
                                                        <br/>
                                                        <strong>Start:</strong> {formatTime(task.startTime)} | <strong>Stop:</strong> {formatTime(task.endTime)}
                                                    </div>
                                                    {task.notes && <div><strong>Note:</strong> {task.notes}</div>}
                                                    {task.materials && <div><strong>Materiale:</strong> {task.materials}</div>}
                                                </div>
                                                {task.photos.length > 0 && (
                                                    <div className="mt-2">
                                                        <strong className="text-xs text-slate-400">Poze:</strong>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {task.photos.map((photo, idx) => (
                                                                <a key={idx} href={photo} target="_blank" rel="noopener noreferrer">
                                                                    <img src={photo} alt={`Foto ${idx+1}`} className="h-16 w-16 object-cover rounded"/>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkOrderArchive;
