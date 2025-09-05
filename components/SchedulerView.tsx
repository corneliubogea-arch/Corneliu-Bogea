import React, { useState, useMemo } from 'react';
import type { Equipment, ScheduledTask } from '../types';
import { getPreventiveTasksForEquipment } from '../constants';

interface SchedulerViewProps {
  equipmentList: Equipment[];
  onUpdateOperatingHours: (equipmentId: string, hours: number) => void;
  onUpdateGroupOperatingHours: (line: 1 | 2, hours: number) => void;
  selectedLine: 1 | 2;
  onGenerateInteractiveWorkOrder: (tasks: ScheduledTask[]) => void;
}

const SchedulerView: React.FC<SchedulerViewProps> = ({ equipmentList, onUpdateOperatingHours, onUpdateGroupOperatingHours, selectedLine, onGenerateInteractiveWorkOrder }) => {
  const [schedule, setSchedule] = useState<ScheduledTask[]>([]);
  const [wasCalculated, setWasCalculated] = useState(false);

  const { conveyors, otherEquipment } = useMemo(() => {
    const conveyors = equipmentList.filter(e => e.equipmentType === 'Conveior');
    const otherEquipment = equipmentList.filter(e => e.equipmentType !== 'Conveior');
    return { conveyors, otherEquipment };
  }, [equipmentList]);

  const conveyorGroupName = selectedLine === 1 ? "Conveioare B1-B20" : "Conveioare B21-B41";

  const handleCalculateSchedule = () => {
    const upcomingTasks: ScheduledTask[] = [];

    equipmentList.forEach(equipment => {
      const operatingHours = Number(equipment.operatingHours);
      if (operatingHours > 0) {
        const preventiveTasks = getPreventiveTasksForEquipment(equipment);
        preventiveTasks.forEach(task => {
          if (task.frequency > 0) {
            const timesDone = Math.floor(operatingHours / task.frequency);
            const nextDueHours = (timesDone + 1) * task.frequency;
            const hoursUntilDue = nextDueHours - operatingHours;

            if (hoursUntilDue >= 0 && hoursUntilDue <= 24) {
              upcomingTasks.push({
                equipmentName: equipment.name,
                task,
                hoursUntilDue,
              });
            }
          }
        });
      }
    });

    upcomingTasks.sort((a, b) => a.hoursUntilDue - b.hoursUntilDue);
    setSchedule(upcomingTasks);
    setWasCalculated(true);
  };

  const scheduledTasksByEquipment = useMemo(() => {
    return schedule.reduce((acc, scheduledTask) => {
      if (!acc[scheduledTask.equipmentName]) {
        acc[scheduledTask.equipmentName] = [];
      }
      acc[scheduledTask.equipmentName].push(scheduledTask);
      return acc;
    }, {} as Record<string, ScheduledTask[]>);
  }, [schedule]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-sky-400 mb-4">Introduceți Orele de Funcționare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {conveyors.length > 0 && (
              <div className="bg-slate-900/50 p-4 rounded-md border border-sky-800">
                <label htmlFor={`hours-conveyors-${selectedLine}`} className="block text-sm font-bold text-sky-300 mb-1">
                  {conveyorGroupName}
                </label>
                <input
                  type="number"
                  id={`hours-conveyors-${selectedLine}`}
                  value={conveyors[0]?.operatingHours || ''}
                  onChange={(e) => onUpdateGroupOperatingHours(selectedLine, parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="ex: 1500"
                  min="0"
                />
              </div>
            )}

            {otherEquipment.map(equipment => (
              <div key={equipment.id}>
                <label htmlFor={`hours-${equipment.id}`} className="block text-sm font-medium text-slate-300 mb-1 truncate" title={equipment.name}>
                  {equipment.name}
                </label>
                <input
                  type="number"
                  id={`hours-${equipment.id}`}
                  value={equipment.operatingHours || ''}
                  onChange={(e) => onUpdateOperatingHours(equipment.id, parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="ex: 430"
                  min="0"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleCalculateSchedule}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg"
            >
              Calculează Programul
            </button>
             {wasCalculated && schedule.length > 0 && (
              <button
                onClick={() => onGenerateInteractiveWorkOrder(schedule)}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg"
              >
                Generează Ordin Interactiv
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">Program de Mentenanță (Următoarele 24 ore de funcționare)</h2>
          {wasCalculated && schedule.length === 0 ? (
            <p className="text-center text-slate-400 py-10">Nicio activitate de mentenanță programată în următoarele 24 de ore de funcționare.</p>
          ) : !wasCalculated ? (
             <p className="text-center text-slate-500 py-10">Programul va fi afișat aici după calcul.</p>
          ) : (
            <div className="space-y-6">
              {Object.entries(scheduledTasksByEquipment).map(([equipmentName, tasks]) => (
                <div key={equipmentName} className="bg-slate-900/50 p-4 rounded-md">
                   <h3 className="text-xl font-semibold text-sky-300 mb-3">{equipmentName}</h3>
                   <ul className="space-y-2">
                      {tasks.map((scheduledTask, index) => (
                         <li key={index} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-md">
                            <span className="text-slate-200 flex-1 pr-4">{scheduledTask.task.description}</span>
                            <span className="text-teal-300 font-bold bg-teal-500/20 px-3 py-1 rounded-full text-sm">
                                În {scheduledTask.hoursUntilDue} ore
                            </span>
                         </li>
                      ))}
                   </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulerView;
