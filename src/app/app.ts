import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchFilterComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isFormOpen = signal(false);
  employeeToEdit = signal<Employee | null>(null);

  openAddForm(): void {
    this.employeeToEdit.set(null);
    this.isFormOpen.set(true);
  }

  openEditForm(employee: Employee): void {
    this.employeeToEdit.set(employee);
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.employeeToEdit.set(null);
  }

  onEmployeeSaved(employee: Employee): void {
    console.log('Employee saved:', employee);
    this.closeForm();
  }
}
