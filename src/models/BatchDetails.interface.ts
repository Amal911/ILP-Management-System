// src/app/models/batch-details.interface.ts

export interface Location {
    id: number;
    locationName: string;
  }
  
  export interface BatchType {
    id: number;
    batchTypeName: string;
  }
  
//   export interface Assessment {
//     id: number;
//     evaluationCriteria: string;
//     weightage: number;
//   }
  
//   export interface Phase {
//     id:number
//     phaseName: string;
//     numberOfDays: number;
//     phaseStartDate: string;
//     phaseEndDate: string;
//     assessmentTypeList: Assessment[];
//   }
  
  export interface BatchDetail {
    batchCode: string;
    batchDuration: number;
    batchName: string;
    //batchPhases: Phase[];
    batchType: BatchType;
    batchTypeId: number;
    endDate: string;
    id: number;
    isActive: boolean;
    location: Location;
    locationId: number;
    programId: number;
    proogram: string;
    startDate: string;
    traineeCount: number;
    traineeList: any[];  
  }
export interface UpdateBatchRequestDTO {
    id: number;
    batchName: string;
    batchCode: string;
    batchDuration: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    programId: number;
    locationId: number;
    batchTypeId: number;
    batchPhases: BatchPhaseDTO[];
  }
  
  export interface BatchPhaseDTO {
    id: number;
    numberOfDays: number;
    startDate: string;
    endDate: string;
    isCompleted: boolean;
    phaseAssessmentTypeMappings: PhaseAssessmentTypeMappingDTO[];
  }
  
  export interface PhaseAssessmentTypeMappingDTO {
    id: number;
    assessmentTypeId: number;
    weightage: number;
  }
  
  