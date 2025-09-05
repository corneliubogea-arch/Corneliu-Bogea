export type EquipmentType = 
  | 'Conveior' 
  | 'Sortator Optic' 
  | 'Separator Balistic' 
  | 'Separator Neferoase' 
  | 'Separator Metale' 
  | 'Desfacator de Saci' 
  | 'Sita Rotativa' 
  | 'Presa de Balotat' 
  | 'Compresor Aer'
  | 'Necunoscut';

export interface Recommendation {
  how: string;
  withWhat: string;
  deadline: string;
  action: string;
}

export interface NonConformity {
  id: string;
  type: string;
  notes: string;
  photo?: string; // base64 string
  recommendation?: Recommendation;
  discoveryDate?: string;
}

export interface Equipment {
  id: string;
  name: string;
  line: 1 | 2;
  equipmentType: EquipmentType;
  nonConformities: NonConformity[];
  completedMaintenanceTasks?: string[];
  operatingHours: number;
}

export interface PreventiveTask {
  description: string;
  frequency: number;
}

export interface ScheduledTask {
  equipmentName: string;
  task: PreventiveTask;
  hoursUntilDue: number;
}

export type EvaluationLevel = 'Nesatisfacator' | 'Satisfacator' | 'Bun';

export interface ReportEvaluations {
  cleaning: EvaluationLevel;
  lubrication: EvaluationLevel;
  operation: EvaluationLevel;
}

// --- Interactive Work Order Types ---

export type TaskStatus = 'Nefinalizat' | 'În desfășurare' | 'Finalizat' | 'Amânat';

export interface InteractiveTask extends ScheduledTask {
    id: string;
    status: TaskStatus;
    startTime?: number; // Unix timestamp
    endTime?: number; // Unix timestamp
    notes: string;
    materials: string;
    photos: string[]; // array of base64 strings
}

export interface WorkOrder {
    id: string; // e.g., 'WO-20231027-1'
    date: string;
    line: 1 | 2;
    technicianName: string;
    tasks: InteractiveTask[];
}
