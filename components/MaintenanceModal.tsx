import React, { useState, useMemo } from 'react';
import type { Equipment } from '../types';
import { getMaintenanceTasksForEquipment } from '../constants';
import { CheckIcon } from './icons';

interface MaintenanceModalProps {
  equipment: Equipment;
  onClose: () => void;
  onSave: (equipmentId: string, tasks: string[]) => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ equipment, onClose, onSave }) => {
  const availableTasks = useMemo(() => getMaintenanceTasksForEquipment(equipment), [equipment]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(equipment.completedMaintenanceTasks || []);

  const handleToggleTask = (task: string) => {
    setSelectedTasks(prev => 
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === availableTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(availableTasks);
    }
  };

  const handleSave = () => {
    onSave(equipment.id, selectedTasks);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-sky-400 mb-1">Activități de Mentenanță</h2>
          <p className="text-slate-400">{equipment.name}</p>
        </div>
        
        {availableTasks.length > 0 ? (
            <div className="p-6 overflow-y-auto flex-grow">
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={handleSelectAll} 
                        className="text-sm font-semibold text-sky-400 hover:text-sky-300"
                    >
                        {selectedTasks.length === availableTasks.length ? 'Deselectează Tot' : 'Selectează Tot'}
                    </button>
                </div>
                <div className="space-y-3">
                    {availableTasks.map((task, index) => (
                    <label key={index} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-md cursor-pointer hover:bg-slate-700 transition-colors">
                        <input
                        type="checkbox"
                        checked={selectedTasks.includes(task)}
                        onChange={() => handleToggleTask(task)}
                        className="mt-1 h-5 w-5 rounded bg-slate-600 border-slate-500 text-sky-500 focus:ring-sky-500 cursor-pointer"
                        />
                        <span className="text-slate-200">{task}</span>
                    </label>
                    ))}
                </div>
            </div>
        ) : (
            <div className="p-6 text-center text-slate-400 flex-grow flex items-center justify-center">
                <p>Nicio activitate de mentenanță specifică definită pentru acest echipament.</p>
            </div>
        )}
        
        <div className="bg-slate-900 px-6 py-4 flex justify-end gap-4 sticky bottom-0 rounded-b-lg">
          <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md">Anulează</button>
          <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md">Salvează</button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModal;
