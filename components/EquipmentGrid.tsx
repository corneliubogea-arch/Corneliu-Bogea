import React, { useState } from 'react';
import type { Equipment, NonConformity } from '../types';
import FindingModal from './FindingModal';
import MaintenanceModal from './MaintenanceModal';
import { PlusIcon, EditIcon, CheckIcon } from './icons';

interface EquipmentGridProps {
  equipmentList: Equipment[];
  onUpdateEquipment: (updatedEquipment: Equipment) => void;
  onUpdateMaintenanceTasks: (equipmentId: string, tasks: string[]) => void;
}

const EquipmentCard: React.FC<{ 
  equipment: Equipment; 
  onAdd: () => void;
  onEdit: (finding: NonConformity) => void;
  onOpenMaintenance: () => void;
}> = ({ equipment, onAdd, onEdit, onOpenMaintenance }) => {
  const hasMaintenance = equipment.completedMaintenanceTasks && equipment.completedMaintenanceTasks.length > 0;

  return (
    <div className="bg-slate-800 rounded-lg p-4 flex flex-col justify-between shadow-lg hover:shadow-sky-500/20 transition-shadow min-h-[160px]">
      <div className="flex-grow">
          <h3 className="font-bold text-lg text-slate-200 mb-3">{equipment.name}</h3>
          {equipment.nonConformities.length > 0 ? (
            <ul className="space-y-1.5 text-sm">
              {equipment.nonConformities.map(finding => (
                <li key={finding.id} className="flex justify-between items-center bg-slate-700/50 p-1.5 rounded-md group">
                  <span className="flex-1 text-slate-300 truncate pr-2" title={finding.type}>{finding.type}</span>
                  <button onClick={() => onEdit(finding)} className="p-1 text-slate-400 group-hover:text-sky-400 transition-colors">
                    <EditIcon className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
               {hasMaintenance ? (
                  <p className="text-green-400 text-sm italic flex items-center gap-2"><CheckIcon className="w-5 h-5"/> {equipment.completedMaintenanceTasks.length} activități de mentenanță efectuate.</p>
               ) : (
                  <p className="text-slate-500 text-sm italic">Nicio neconformitate.</p>
               )}
            </div>
          )}
      </div>
      <div className="mt-4 space-y-2">
          <button onClick={onOpenMaintenance} className={`w-full flex items-center justify-center gap-2 font-semibold py-2 px-3 rounded-md transition-colors text-sm ${
              hasMaintenance
              ? 'bg-green-800/80 hover:bg-green-700/80 text-green-200' 
              : 'bg-slate-600 hover:bg-slate-500 text-slate-200'
          }`}>
              <CheckIcon className="w-5 h-5"/>
              <span>{hasMaintenance ? 'Editează Mentenanță' : 'Marchează Mentenanță'}</span>
          </button>
          <button onClick={onAdd} className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-3 rounded-md transition-colors text-sm">
              <PlusIcon className="w-5 h-5"/>
              <span>Adaugă Constatare</span>
          </button>
      </div>
    </div>
  );
};

const EquipmentGrid: React.FC<EquipmentGridProps> = ({ equipmentList, onUpdateEquipment, onUpdateMaintenanceTasks }) => {
  const [findingModalEquipment, setFindingModalEquipment] = useState<Equipment | null>(null);
  const [modalFinding, setModalFinding] = useState<NonConformity | null>(null);
  const [maintenanceModalEquipment, setMaintenanceModalEquipment] = useState<Equipment | null>(null);

  const handleOpenAddModal = (equipment: Equipment) => {
    setModalFinding(null);
    setFindingModalEquipment(equipment);
  };

  const handleOpenEditModal = (equipment: Equipment, finding: NonConformity) => {
    setModalFinding(finding);
    setFindingModalEquipment(equipment);
  };
  
  const handleOpenMaintenanceModal = (equipment: Equipment) => {
    setMaintenanceModalEquipment(equipment);
  };

  const handleSaveNonConformity = (equipmentId: string, findingData: NonConformity) => {
    const equipmentToUpdate = equipmentList.find(e => e.id === equipmentId);
    if (equipmentToUpdate) {
      const existingFindingIndex = equipmentToUpdate.nonConformities.findIndex(f => f.id === findingData.id);
      
      let updatedNonConformities: NonConformity[];

      if (existingFindingIndex > -1) {
        updatedNonConformities = [...equipmentToUpdate.nonConformities];
        updatedNonConformities[existingFindingIndex] = findingData;
      } else {
        updatedNonConformities = [...equipmentToUpdate.nonConformities, findingData];
      }

      const updatedEquipment = {
        ...equipmentToUpdate,
        nonConformities: updatedNonConformities
      };
      onUpdateEquipment(updatedEquipment);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {equipmentList.map(equipment => (
           <EquipmentCard 
              key={equipment.id} 
              equipment={equipment} 
              onAdd={() => handleOpenAddModal(equipment)}
              onEdit={(finding) => handleOpenEditModal(equipment, finding)}
              onOpenMaintenance={() => handleOpenMaintenanceModal(equipment)}
            />
        ))}
      </div>
      {findingModalEquipment && (
        <FindingModal
          equipment={findingModalEquipment}
          findingToEdit={modalFinding}
          onClose={() => setFindingModalEquipment(null)}
          onSave={handleSaveNonConformity}
        />
      )}
      {maintenanceModalEquipment && (
        <MaintenanceModal
          equipment={maintenanceModalEquipment}
          onClose={() => setMaintenanceModalEquipment(null)}
          onSave={onUpdateMaintenanceTasks}
        />
      )}
    </div>
  );
};

export default EquipmentGrid;