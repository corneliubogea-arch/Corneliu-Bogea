import React, { useCallback } from 'react';
import type { WorkOrder, InteractiveTask, TaskStatus } from '../types';
import { BackIcon, SaveIcon, CameraIcon, TrashIcon } from './icons';

interface InteractiveWorkOrderViewProps {
  workOrder: WorkOrder;
  onUpdate: (workOrder: WorkOrder) => void;
  onArchive: (workOrder: WorkOrder) => void;
  onBack: () => void;
}

const statusOptions: TaskStatus[] = ['Nefinalizat', 'În desfășurare', 'Finalizat', 'Amânat'];
const statusColors: Record<TaskStatus, string> = {
    'Nefinalizat': 'bg-slate-500',
    'În desfășurare': 'bg-yellow-500',
    'Finalizat': 'bg-green-500',
    'Amânat': 'bg-red-500',
};

const TaskCard: React.FC<{ 
    task: InteractiveTask; 
    onUpdateTask: (updatedTask: InteractiveTask) => void;
}> = ({ task, onUpdateTask }) => {

    const handleFieldChange = (field: keyof InteractiveTask, value: any) => {
        onUpdateTask({ ...task, [field]: value });
    };

    const handleTime = (type: 'start' | 'stop') => {
        const now = Date.now();
        if (type === 'start') {
            onUpdateTask({ ...task, startTime: now, status: 'În desfășurare' });
        } else {
            onUpdateTask({ ...task, endTime: now, status: 'Finalizat' });
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            files.forEach(file => {
                 const reader = new FileReader();
                reader.onloadend = () => {
                    const newPhotos = [...task.photos, reader.result as string];
                    onUpdateTask({ ...task, photos: newPhotos });
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleRemovePhoto = (indexToRemove: number) => {
        const newPhotos = task.photos.filter((_, index) => index !== indexToRemove);
        onUpdateTask({ ...task, photos: newPhotos });
    };

    const formatTime = (timestamp?: number) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className="bg-slate-900/50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-slate-200 mb-3">{task.task.description}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                    <select
                        value={task.status}
                        onChange={(e) => handleFieldChange('status', e.target.value)}
                        className={`w-full text-white font-bold border-0 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none ${statusColors[task.status]}`}
                    >
                        {statusOptions.map(opt => <option key={opt} value={opt} className="bg-slate-700">{opt}</option>)}
                    </select>
                </div>
                {/* Timestamps */}
                <div className="flex items-end gap-2">
                    <button onClick={() => handleTime('start')} disabled={!!task.startTime} className="bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-md">Start</button>
                    <button onClick={() => handleTime('stop')} disabled={!task.startTime || !!task.endTime} className="bg-red-600 hover:bg-red-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-md">Stop</button>
                </div>
                <div className="text-sm">
                    <p>Start: <span className="font-semibold">{formatTime(task.startTime)}</span></p>
                    <p>Stop: <span className="font-semibold">{formatTime(task.endTime)}</span></p>
                </div>
                 {/* Empty cell for alignment */}
                <div></div>

                {/* Notes */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Observații / Constatări / Recomandări</label>
                    <textarea 
                        value={task.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                        rows={3} 
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                </div>
                {/* Materials */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Materiale / Piese Folosite (Opțional)</label>
                    <textarea 
                        value={task.materials}
                        onChange={(e) => handleFieldChange('materials', e.target.value)}
                        rows={3} 
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                </div>
                {/* Photos */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Poze (Opțional)</label>
                    <label htmlFor={`photo-upload-${task.id}`} className="cursor-pointer bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md inline-flex items-center gap-2">
                      <CameraIcon className="w-5 h-5" />
                      <span>Încarcă</span>
                    </label>
                    <input id={`photo-upload-${task.id}`} type="file" accept="image/*" multiple className="sr-only" onChange={handleFileChange} />
                     <div className="flex flex-wrap gap-2 mt-2">
                        {task.photos.map((photo, index) => (
                            <div key={index} className="relative">
                                <img src={photo} alt={`Foto ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                                <button onClick={() => handleRemovePhoto(index)} className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white hover:bg-red-500">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const InteractiveWorkOrderView: React.FC<InteractiveWorkOrderViewProps> = ({ workOrder, onUpdate, onArchive, onBack }) => {
    
    const handleTechnicianNameChange = useCallback((name: string) => {
        onUpdate({ ...workOrder, technicianName: name });
    }, [workOrder, onUpdate]);

    const handleUpdateTask = useCallback((updatedTask: InteractiveTask) => {
        const updatedTasks = workOrder.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        onUpdate({ ...workOrder, tasks: updatedTasks });
    }, [workOrder, onUpdate]);

    const tasksByEquipment = React.useMemo(() => {
        return workOrder.tasks.reduce((acc, task) => {
            if (!acc[task.equipmentName]) {
                acc[task.equipmentName] = [];
            }
            acc[task.equipmentName].push(task);
            return acc;
        }, {} as Record<string, InteractiveTask[]>);
    }, [workOrder.tasks]);
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-sky-400">Ordin de Lucru Interactiv</h1>
                    <span className="text-lg text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">{workOrder.id}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={onBack} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        <BackIcon className="w-5 h-5"/>
                        <span>Înapoi</span>
                    </button>
                    <button onClick={() => onArchive(workOrder)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        <SaveIcon className="w-5 h-5"/>
                        <span>Salvează și Arhivează</span>
                    </button>
                </div>
            </header>
            
            <div className="bg-slate-800 p-6 rounded-lg mb-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400">Data</label>
                        <p className="text-lg font-semibold">{workOrder.date}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400">Linia</label>
                        <p className="text-lg font-semibold">{workOrder.line}</p>
                    </div>
                    <div>
                        <label htmlFor="wo-tech-name" className="block text-sm font-medium text-slate-400 mb-1">Nume Tehnician</label>
                        <input
                            id="wo-tech-name"
                            type="text"
                            value={workOrder.technicianName}
                            onChange={(e) => handleTechnicianNameChange(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                            placeholder="Introduceți numele..."
                        />
                    </div>
                </div>
            </div>

            <main className="space-y-8">
                {Object.entries(tasksByEquipment).map(([equipmentName, tasks]) => (
                    <section key={equipmentName}>
                        <h3 className="text-2xl font-semibold text-sky-300 mb-4">{equipmentName}</h3>
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <TaskCard key={task.id} task={task} onUpdateTask={handleUpdateTask} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default InteractiveWorkOrderView;
