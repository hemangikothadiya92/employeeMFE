import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDataService } from '../service/employee-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  checked = false;

  constructor(
    private fb: FormBuilder,
    private _empDataService: EmployeeDataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, this.mobileValidator()]],
      address: [''],
      active: [false],
    });
  }

  mobileValidator() {
    return (control: any) => {
      const mobilePatter = /^\d{10}$/;
      if (control.value && !mobilePatter.test(control.value)) {
        return { invalidMobile: true };
      }
      return null;
    };
  }

  onSubmit() {
    if(this.employeeForm.valid) {
      this._empDataService.addEmployee(this.employeeForm.value)
          .subscribe({
            next: (value: any) => {
              console.log(`${value} added sucessfully`);
              this._router.navigate(['/employee-details']);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
    }
    
  }
}
