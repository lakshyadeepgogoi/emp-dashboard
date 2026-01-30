export interface Employee {
    id: string;
    name: string;
    email: string;
    department: Department;
    dateOfJoining: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type Department = 'HR' | 'Engineering' | 'Sales' | 'Marketing' | 'Finance' | 'Operations';

export const DEPARTMENTS: Department[] = [
    'HR',
    'Engineering',
    'Sales',
    'Marketing',
    'Finance',
    'Operations'
];

export type SortField = 'name' | 'dateOfJoining';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    field: SortField;
    direction: SortDirection;
}

export interface FilterConfig {
    searchTerm: string;
    department: Department | 'all';
}
