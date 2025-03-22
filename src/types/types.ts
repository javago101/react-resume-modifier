export interface Resume {
    id: string;
    userId: string;
    originalFileName: string;
    modifiedFileName: string;
    uploadDate: Date;
    lastModified: Date;
    version: number;
    modifications: ResumeModification[];
}

export interface ResumeModification {
    id: string;
    resumeId: string;
    modificationDate: Date;
    description: string;
    aiSuggestions: string[];
}

export interface JobApplication {
    id: string;
    userId: string;
    resumeId: string;
    company: string;
    position: string;
    applicationDate: Date;
    status: ApplicationStatus;
    notes: string;
    interviews: Interview[];
}

export interface Interview {
    id: string;
    applicationId: string;
    date: Date;
    type: InterviewType;
    notes: string;
    feedback?: string;
    status: InterviewStatus;
}

export enum ApplicationStatus {
    DRAFT = 'DRAFT',
    APPLIED = 'APPLIED',
    INTERVIEWING = 'INTERVIEWING',
    OFFERED = 'OFFERED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    WITHDRAWN = 'WITHDRAWN'
}

export enum InterviewType {
    PHONE_SCREEN = 'PHONE_SCREEN',
    TECHNICAL = 'TECHNICAL',
    BEHAVIORAL = 'BEHAVIORAL',
    ONSITE = 'ONSITE',
    FINAL = 'FINAL'
}

export enum InterviewStatus {
    SCHEDULED = 'SCHEDULED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    RESCHEDULED = 'RESCHEDULED'
} 