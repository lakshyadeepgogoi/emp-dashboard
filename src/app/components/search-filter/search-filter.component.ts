import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { DEPARTMENTS, Department, SortField } from '../../models/employee.model';

@Component({
    selector: 'app-search-filter',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-filter.component.html',
    styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {
    employeeService = inject(EmployeeService);
    addEmployee = output<void>();

    departments = DEPARTMENTS;
    searchTerm = '';
    selectedDepartment: Department | 'all' = 'all';

    onSearch(): void {
        this.employeeService.setFilter({ searchTerm: this.searchTerm });
    }

    onDepartmentChange(): void {
        this.employeeService.setFilter({ department: this.selectedDepartment });
    }

    onSort(field: SortField): void {
        this.employeeService.setSort(field);
    }

    clearFilters(): void {
        this.searchTerm = '';
        this.selectedDepartment = 'all';
        this.employeeService.resetFilters();
    }

    onAddEmployee(): void {
        this.addEmployee.emit();
    }

    get hasActiveFilters(): boolean {
        const filter = this.employeeService.filterConfig();
        return filter.searchTerm !== '' || filter.department !== 'all';
    }

    getSortIcon(field: SortField): string {
        const sortConfig = this.employeeService.sortConfig();
        if (sortConfig.field !== field) return 'unfold_more';
        return sortConfig.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }

    isSortActive(field: SortField): boolean {
        return this.employeeService.sortConfig().field === field;
    }
}
