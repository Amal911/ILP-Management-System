export interface LeaveRequest {
    id: number;
    createdDate: string;
    numofDays: number;
    leaveDate: string;
    leaveDateFrom: string;
    leaveDateTo: string;
    reason: string;
    description: string;
    isPending: (boolean | null)[];
}

