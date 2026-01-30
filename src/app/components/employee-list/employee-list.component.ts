import { Component, inject, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
    employeeService = inject(EmployeeService);

    editEmployee = output<Employee>();

    onEdit(employee: Employee): void {
        this.editEmployee.emit(employee);
    }

    onDelete(employee: Employee): void {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            this.employeeService.deleteEmployee(employee.id);
        }
    }

    getDepartmentColor(department: string): string {
        const colors: { [key: string]: string } = {
            'HR': 'hr',
            'Engineering': 'engineering',
            'Sales': 'sales',
            'Marketing': 'marketing',
            'Finance': 'finance',
            'Operations': 'operations'
        };
        return colors[department] || 'default';
    }

    getInitials(name: string): string {
        return name
            .split(' ')
            .map(n => n.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    getAvatarColor(name: string): string {
        const colors = [
            'avatar-blue',
            'avatar-purple',
            'avatar-green',
            'avatar-orange',
            'avatar-pink',
            'avatar-teal'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    }
}
