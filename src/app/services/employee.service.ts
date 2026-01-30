import { Injectable, signal, computed } from '@angular/core';
import { Employee, Department, SortConfig, FilterConfig, SortField, SortDirection } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private readonly STORAGE_KEY = 'employee_dashboard_data';

    // Signals for reactive state management
    private employeesSignal = signal<Employee[]>(this.loadFromStorage());
    private sortConfigSignal = signal<SortConfig>({ field: 'name', direction: 'asc' });
    private filterConfigSignal = signal<FilterConfig>({ searchTerm: '', department: 'all' });

    // Computed signal for filtered and sorted employees
    readonly employees = computed(() => {
        const employees = this.employeesSignal();
        const sortConfig = this.sortConfigSignal();
        const filterConfig = this.filterConfigSignal();

        let filtered = [...employees];

        // Filter by department
        if (filterConfig.department !== 'all') {
            filtered = filtered.filter(emp => emp.department === filterConfig.department);
        }

        // Search by name or email (case-insensitive)
        if (filterConfig.searchTerm) {
            const term = filterConfig.searchTerm.toLowerCase();
            filtered = filtered.filter(emp =>
                emp.name.toLowerCase().includes(term) ||
                emp.email.toLowerCase().includes(term)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            let comparison = 0;

            if (sortConfig.field === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortConfig.field === 'dateOfJoining') {
                comparison = new Date(a.dateOfJoining).getTime() - new Date(b.dateOfJoining).getTime();
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return filtered;
    });

    readonly sortConfig = computed(() => this.sortConfigSignal());
    readonly filterConfig = computed(() => this.filterConfigSignal());
    readonly totalCount = computed(() => this.employeesSignal().length);
    readonly filteredCount = computed(() => this.employees().length);

    private loadFromStorage(): Employee[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const employees = JSON.parse(data) as Employee[];
                // Convert date strings back to Date objects
                return employees.map(emp => ({
                    ...emp,
                    dateOfJoining: new Date(emp.dateOfJoining),
                    createdAt: new Date(emp.createdAt),
                    updatedAt: new Date(emp.updatedAt)
                }));
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
        return [];
    }

    private saveToStorage(): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employeesSignal()));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    private generateId(): string {
        return `emp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    addEmployee(employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Employee {
        const now = new Date();
        const newEmployee: Employee = {
            ...employeeData,
            id: this.generateId(),
            createdAt: now,
            updatedAt: now
        };

        this.employeesSignal.update(employees => [...employees, newEmployee]);
        this.saveToStorage();
        return newEmployee;
    }

    updateEmployee(id: string, employeeData: Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>>): Employee | null {
        let updatedEmployee: Employee | null = null;

        this.employeesSignal.update(employees => {
            return employees.map(emp => {
                if (emp.id === id) {
                    updatedEmployee = {
                        ...emp,
                        ...employeeData,
                        updatedAt: new Date()
                    };
                    return updatedEmployee;
                }
                return emp;
            });
        });

        this.saveToStorage();
        return updatedEmployee;
    }

    deleteEmployee(id: string): boolean {
        const initialLength = this.employeesSignal().length;
        this.employeesSignal.update(employees => employees.filter(emp => emp.id !== id));
        this.saveToStorage();
        return this.employeesSignal().length < initialLength;
    }

    getEmployeeById(id: string): Employee | undefined {
        return this.employeesSignal().find(emp => emp.id === id);
    }

    setSort(field: SortField, direction?: SortDirection): void {
        this.sortConfigSignal.update(current => ({
            field,
            direction: direction ?? (current.field === field && current.direction === 'asc' ? 'desc' : 'asc')
        }));
    }

    setFilter(filter: Partial<FilterConfig>): void {
        this.filterConfigSignal.update(current => ({
            ...current,
            ...filter
        }));
    }

    resetFilters(): void {
        this.filterConfigSignal.set({ searchTerm: '', department: 'all' });
    }

    // Export to CSV
    exportToCSV(): void {
        const employees = this.employees();

        if (employees.length === 0) {
            alert('No employees to export');
            return;
        }

        const headers = ['Name', 'Email', 'Department', 'Date of Joining'];
        const csvRows = [
            headers.join(','),
            ...employees.map(emp => [
                `"${emp.name}"`,
                `"${emp.email}"`,
                `"${emp.department}"`,
                `"${new Date(emp.dateOfJoining).toISOString().split('T')[0]}"`
            ].join(','))
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
