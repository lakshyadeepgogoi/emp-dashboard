import { Component, inject, input, output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee, DEPARTMENTS, Department } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit, OnChanges {
    private fb = inject(FormBuilder);
    private employeeService = inject(EmployeeService);

    employee = input<Employee | null>(null);
    isOpen = input<boolean>(false);
    close = output<void>();
    saved = output<Employee>();

    departments = DEPARTMENTS;
    employeeForm!: FormGroup;
    isSubmitting = false;

    get isEditMode(): boolean {
        return this.employee() !== null;
    }

    get formTitle(): string {
        return this.isEditMode ? 'Edit Employee' : 'Add New Employee';
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['employee'] || changes['isOpen']) {
            this.initForm();
        }
    }

    private initForm(): void {
        const emp = this.employee();

        this.employeeForm = this.fb.group({
            name: [emp?.name || '', [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern(/^[a-zA-Z\s]+$/)
            ]],
            email: [emp?.email || '', [
                Validators.required,
                Validators.email
            ]],
            department: [emp?.department || '', [
                Validators.required
            ]],
            dateOfJoining: [emp?.dateOfJoining ? this.formatDateForInput(emp.dateOfJoining) : '', [
                Validators.required,
                this.futureDateValidator
            ]]
        });
    }

    private formatDateForInput(date: Date): string {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }

    private futureDateValidator(control: any): { [key: string]: boolean } | null {
        if (control.value) {
            const inputDate = new Date(control.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (inputDate > today) {
                return { 'futureDate': true };
            }
        }
        return null;
    }

    getErrorMessage(field: string): string {
        const control = this.employeeForm.get(field);

        if (!control || !control.errors || !control.touched) {
            return '';
        }

        const errors = control.errors;

        switch (field) {
            case 'name':
                if (errors['required']) return 'Name is required';
                if (errors['minlength']) return 'Name must be at least 3 characters';
                if (errors['pattern']) return 'Name can only contain letters and spaces';
                break;
            case 'email':
                if (errors['required']) return 'Email is required';
                if (errors['email']) return 'Please enter a valid email address';
                break;
            case 'department':
                if (errors['required']) return 'Please select a department';
                break;
            case 'dateOfJoining':
                if (errors['required']) return 'Date of joining is required';
                if (errors['futureDate']) return 'Date of joining cannot be in the future';
                break;
        }

        return 'Invalid input';
    }

    hasError(field: string): boolean {
        const control = this.employeeForm.get(field);
        return !!(control && control.errors && control.touched);
    }

    onSubmit(): void {
        if (this.employeeForm.invalid) {
            // Mark all fields as touched to show errors
            Object.keys(this.employeeForm.controls).forEach(key => {
                const control = this.employeeForm.get(key);
                control?.markAsTouched();
            });
            return;
        }

        this.isSubmitting = true;

        const formValue = this.employeeForm.value;
        const employeeData = {
            name: formValue.name.trim(),
            email: formValue.email.trim().toLowerCase(),
            department: formValue.department as Department,
            dateOfJoining: new Date(formValue.dateOfJoining)
        };

        try {
            let savedEmployee: Employee | null;

            if (this.isEditMode && this.employee()) {
                savedEmployee = this.employeeService.updateEmployee(this.employee()!.id, employeeData);
            } else {
                savedEmployee = this.employeeService.addEmployee(employeeData);
            }

            if (savedEmployee) {
                this.saved.emit(savedEmployee);
                this.onClose();
            }
        } catch (error) {
            console.error('Error saving employee:', error);
        } finally {
            this.isSubmitting = false;
        }
    }

    onClose(): void {
        this.employeeForm.reset();
        this.close.emit();
    }

    onBackdropClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
            this.onClose();
        }
    }

    get maxDate(): string {
        return new Date().toISOString().split('T')[0];
    }
}
