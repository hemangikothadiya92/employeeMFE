import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDataService } from '../service/employee-data.service';
import { Route, Router } from '@angular/router';
import { Employee } from '../employee.interface';

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

  /**
   * Angular Life cycle hook
   */
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      firstName: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      lastName: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, this.mobileValidator()]],
      address: [''],
      active: [false],
    });
  }

  /**
   * check mobile number is valid or not
   * @returns true if mobile number is valid
   */
  mobileValidator() {
    return (control: FormControl) => {
      const mobilePatter = /^\d{10}$/;
      if (control.value && !mobilePatter.test(control.value)) {
        return { invalidMobile: true };
      }
      return null;
    };
  }

  /**
   * whitespace validators for Firstname and Lastname
   * @param control formcontrol
   * @returns 
   */
 noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
}

  /**
   * Submit the form navigate to 'employee-details'
   */
  onSubmit() {
    if(this.employeeForm.valid) {
      this._empDataService.addEmployee(this.employeeForm.value)
          .subscribe({
            next: (value: Employee[]) => {
              this._router.navigateByUrl('employee-details');
            },
            error: (err: any) => {
              console.error(err);
            }
          });
    }
    
  }
}
