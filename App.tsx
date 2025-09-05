import React, { useState, useCallback, useEffect } from 'react';
import type { Equipment, ReportEvaluations, EvaluationLevel, ScheduledTask, WorkOrder, InteractiveTask } from './types';
import { initializeEquipment } from './constants';
import LineSelector from './components/LineSelector';
import EquipmentGrid from './components/EquipmentGrid';
import ReportView from './components/ReportView';
import Home from './components/Home';
import SchedulerView from './components/SchedulerView';
import InteractiveWorkOrderView from './components/InteractiveWorkOrderView';
import WorkOrderArchive from './components/WorkOrderArchive';
import { HomeIcon } from './components/icons';

enum ViewState {
  HOME,
  SELECT_LINE,
  INSPECTION,
  REPORT_VIEW,
  SCHEDULER,
  INTERACTIVE_WORK_ORDER,
  WORK_ORDER_ARCHIVE,
}

const WORK_ORDER_ARCHIVE_KEY = 'ecoLifeStyleWorkOrderArchive';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [appMode, setAppMode] = useState<'reports' | 'scheduler' | 'archive' | null>(null);
  const [selectedLine, setSelectedLine] = useState<1 | 2 | null>(null);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [reportDate, setReportDate] = useState<string>('');
  const [generalComments, setGeneralComments] = useState<string>('');
  const [technicianName, setTechnicianName] = useState<string>('');
  
  const [activeWorkOrder, setActiveWorkOrder] = useState<WorkOrder | null>(null);
  const [workOrderArchive, setWorkOrderArchive] = useState<WorkOrder[]>([]);

  useEffect(() => {
    try {
        const storedArchive = localStorage.getItem(WORK_ORDER_ARCHIVE_KEY);
        if (storedArchive) {
            setWorkOrderArchive(JSON.parse(storedArchive));
        }
    } catch (error) {
        console.error("Failed to load work order archive from localStorage:", error);
    }
  }, []);

  const handleSelectMode = useCallback((mode: 'reports' | 'scheduler' | 'archive') => {
    setAppMode(mode);
    if (mode === 'archive') {
        setView(ViewState.WORK_ORDER_ARCHIVE);
    } else {
        setView(ViewState.SELECT_LINE);
    }
  }, []);

  const handleSelectLine = useCallback((line: 1 | 2) => {
    setSelectedLine(line);
    setEquipmentList(initializeEquipment(line));
    const newDate = new Date().toLocaleDateString('ro-RO');
    setReportDate(newDate);
    if (appMode === 'reports') {
      setView(ViewState.INSPECTION);
    } else if (appMode === 'scheduler') {
      setView(ViewState.SCHEDULER);
    }
  }, [appMode]);

  const handleUpdateEquipment = useCallback((updatedEquipment: Equipment) => {
    setEquipmentList(prevList =>
      prevList.map(e => (e.id === updatedEquipment.id ? updatedEquipment : e))
    );
  }, []);
  
  const handleUpdateMaintenanceTasks = useCallback((equipmentId: string, tasks: string[]) => {
    setEquipmentList(prevList =>
      prevList.map(e =>
        e.id === equipmentId
          ? { ...e, completedMaintenanceTasks: tasks }
          : e
      )
    );
  }, []);

  const handleUpdateOperatingHours = useCallback((equipmentId: string, hours: number) => {
    setEquipmentList(prevList =>
      prevList.map(e =>
        e.id === equipmentId
          ? { ...e, operatingHours: hours }
          : e
      )
    );
  }, []);
  
  const handleUpdateGroupOperatingHours = useCallback((line: 1 | 2, hours: number) => {
    setEquipmentList(prevList =>
      prevList.map(e =>
        (e.line === line && e.equipmentType === 'Conveior')
          ? { ...e, operatingHours: hours }
          : e
      )
    );
  }, []);
  
  const handleGenerateInteractiveWorkOrder = useCallback((tasks: ScheduledTask[]) => {
    const date = new Date();
    const newWorkOrder: WorkOrder = {
        id: `OL-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Date.now().toString().slice(-4)}`,
        date: reportDate,
        line: selectedLine!,
        technicianName: '',
        tasks: tasks.map(task => ({
            ...task,
            id: `task-${Math.random().toString(36).slice(2, 9)}`,
            status: 'Nefinalizat',
            notes: '',
            materials: '',
            photos: [],
        })),
    };
    setActiveWorkOrder(newWorkOrder);
    setView(ViewState.INTERACTIVE_WORK_ORDER);
  }, [reportDate, selectedLine]);

  const handleUpdateWorkOrder = useCallback((updatedWorkOrder: WorkOrder) => {
    setActiveWorkOrder(updatedWorkOrder);
  }, []);

  const handleArchiveWorkOrder = useCallback((workOrderToArchive: WorkOrder) => {
    const updatedArchive = [...workOrderArchive, workOrderToArchive];
    setWorkOrderArchive(updatedArchive);
    try {
        localStorage.setItem(WORK_ORDER_ARCHIVE_KEY, JSON.stringify(updatedArchive));
    } catch(error) {
        console.error("Failed to save work order archive to localStorage:", error);
    }
    setActiveWorkOrder(null);
    setView(ViewState.HOME);
  }, [workOrderArchive]);

  const [evaluations, setEvaluations] = useState<ReportEvaluations>({
    cleaning: 'Satisfacator',
    lubrication: 'Satisfacator',
    operation: 'Satisfacator',
  });

  const handleEvaluationChange = useCallback((
    category: keyof ReportEvaluations, 
    value: EvaluationLevel
  ) => {
    setEvaluations(prev => ({ ...prev, [category]: value }));
  }, []);

  const handleBackToHome = () => {
    setView(ViewState.HOME);
    setAppMode(null);
    setSelectedLine(null);
    setEquipmentList([]);
    setActiveWorkOrder(null);
  };
  
  const handleBackToLineSelect = () => {
    setView(ViewState.SELECT_LINE);
    setSelectedLine(null);
    setEquipmentList([]);
  };

  const renderHeader = (title: string, onBack: () => void, showGenerateButton: boolean = false) => (
    <header className="bg-slate-800/80 backdrop-blur-md shadow-md sticky top-0 z-40 p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-sky-400">{title}</h1>
        <p className="text-slate-400">Linia {selectedLine} - {reportDate}</p>
      </div>
      <div className="flex gap-2">
         <button
            onClick={handleBackToHome}
            className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center gap-2"
            title="Înapoi la ecranul principal"
        >
            <HomeIcon className="w-5 h-5" />
            <span>Acasă</span>
        </button>
        <button
            onClick={onBack}
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
            Înapoi
        </button>
        {showGenerateButton && (
            <button
                onClick={() => setView(ViewState.REPORT_VIEW)}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
                Generează Raport
            </button>
        )}
      </div>
    </header>
  );

  const renderView = () => {
    switch (view) {
      case ViewState.INSPECTION:
        return (
          <main>
            {renderHeader('Raport de Mentenanță', handleBackToLineSelect, true)}
            <EquipmentGrid
              equipmentList={equipmentList}
              onUpdateEquipment={handleUpdateEquipment}
              onUpdateMaintenanceTasks={handleUpdateMaintenanceTasks}
            />
          </main>
        );
      case ViewState.SCHEDULER:
        return (
          <main>
            {renderHeader('Programare Mentenanță Preventivă', handleBackToLineSelect)}
            <SchedulerView
              equipmentList={equipmentList}
              onUpdateOperatingHours={handleUpdateOperatingHours}
              onUpdateGroupOperatingHours={handleUpdateGroupOperatingHours}
              selectedLine={selectedLine!}
              onGenerateInteractiveWorkOrder={handleGenerateInteractiveWorkOrder}
            />
          </main>
        );
      case ViewState.REPORT_VIEW:
        return (
            <ReportView
                date={reportDate}
                line={selectedLine!}
                reportedEquipment={equipmentList.filter(e => e.nonConformities.length > 0 || (e.completedMaintenanceTasks && e.completedMaintenanceTasks.length > 0))}
                onBack={() => setView(ViewState.INSPECTION)}
                generalComments={generalComments}
                onCommentsChange={setGeneralComments}
                evaluations={evaluations}
                onEvaluationChange={handleEvaluationChange}
                technicianName={technicianName}
                onTechnicianNameChange={setTechnicianName}
            />
        );
      case ViewState.INTERACTIVE_WORK_ORDER:
        return (
            activeWorkOrder && (
                <InteractiveWorkOrderView
                    workOrder={activeWorkOrder}
                    onUpdate={handleUpdateWorkOrder}
                    onArchive={handleArchiveWorkOrder}
                    onBack={() => setView(ViewState.SCHEDULER)}
                />
            )
        );
    case ViewState.WORK_ORDER_ARCHIVE:
        return (
            <WorkOrderArchive
                archive={workOrderArchive}
                onBack={handleBackToHome}
            />
        );
      case ViewState.SELECT_LINE:
        return <LineSelector onSelectLine={handleSelectLine} appMode={appMode as 'reports' | 'scheduler'} />;
      case ViewState.HOME:
      default:
        return <Home onSelectMode={handleSelectMode} />;
    }
  };

  return <div className="min-h-screen bg-slate-900">{renderView()}</div>;
};

export default App;
