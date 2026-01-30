import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    themeService = inject(ThemeService);
    employeeService = inject(EmployeeService);

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    exportCSV(): void {
        this.employeeService.exportToCSV();
    }
}
